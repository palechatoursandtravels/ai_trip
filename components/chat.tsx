'use client';

import type { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { ChatHeader } from '@/components/chat-header';
import { PreviewMessage, ThinkingMessage } from '@/components/message';
import { useScrollToBottom } from '@/components/use-scroll-to-bottom';
import type { Vote } from '@/lib/db/schema';
import { fetcher } from '@/lib/utils';

import { Block, type UIBlock } from './block';
import { BlockStreamHandler } from './block-stream-handler';
import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';
import { Guide } from './guide';
import { ChatTour } from './ChatTour';

export function Chat({
  id,
  initialMessages,
  selectedModelId,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
}) {
  const { mutate } = useSWRConfig();

  const [hasSeenTour, setHasSeenTour] = useLocalStorage('hasSeenTour', false);
  const [tourOpen, setTourOpen] = useState(false);


  // Effect to auto-start tour on first visit
  useEffect(() => {
    if (!hasSeenTour) {
      setTourOpen(true);
      setHasSeenTour(true);
    }
  }, [hasSeenTour, setHasSeenTour]);


  const startTour = useCallback(() => {
    console.log('Starting tour');  // Debug log
    setTourOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    console.log('Closing tour');  // Debug log
    setTourOpen(false);
  }, []);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data: streamingData,
  } = useChat({
    body: { id, modelId: selectedModelId },
    initialMessages,
    onFinish: () => {
      mutate('/api/history');
    },
  });

  const { width: windowWidth = 1920, height: windowHeight = 1080 } =
    useWindowSize();

  const [block, setBlock] = useState<UIBlock>({
    documentId: 'init',
    content: '',
    title: '',
    status: 'idle',
    isVisible: false,
    boundingBox: {
      top: windowHeight / 4,
      left: windowWidth / 4,
      width: 250,
      height: 50,
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  const [hasSeenGuide, setHasSeenGuide] = useLocalStorage('hasSeenGuide', false);
  const [showGuide, setShowGuide] = useState(!hasSeenGuide);

  const handleGuideClose = () => {
    setShowGuide(false);
    setHasSeenGuide(true);
  };

  const lastAIMessage = messages
  .filter(msg => msg.role === 'assistant')
  .pop()?.content;




  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader selectedModelId={selectedModelId} lastAIMessage={lastAIMessage} block={block} onStartTour={startTour}/>
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-4 md:gap-6 flex-1 overflow-y-scroll pt-2 md:pt-4 px-2 md:px-4"
        >
          {messages.length === 0 && <Overview />}

          {messages.map((message, index) => (
            <PreviewMessage
              key={message.id}
              chatId={id}
              message={message}
              block={block}
              setBlock={setBlock}
              isLoading={isLoading && messages.length - 1 === index}
              vote={votes?.find((vote) => vote.messageId === message.id)}
            />
          ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === 'user' && (
              <ThinkingMessage />
            )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[16px] md:min-w-[24px] min-h-[16px] md:min-h-[24px]"
          />
        </div>
        <form className="flex mx-auto px-2 md:px-4 bg-background pb-2 md:pb-6 gap-2 w-full max-w-full md:max-w-3xl">
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
            className="w-full"
          />
        </form>
      <ChatTour 
        isOpen={tourOpen}
        onClose={closeTour}
        onStart={startTour}
      />
      </div>


      <Guide isOpen={showGuide} onClose={handleGuideClose} />

      <AnimatePresence>
        {block?.isVisible && (
          <Block
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            append={append}
            block={block}
            setBlock={setBlock}
            messages={messages}
            setMessages={setMessages}
            votes={votes}
          />
        )}
      </AnimatePresence>

      <BlockStreamHandler streamingData={streamingData} setBlock={setBlock} />
    </>
  );
}