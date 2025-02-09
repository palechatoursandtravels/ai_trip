import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat as PreviewChat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { convertToUIMessages } from '@/lib/utils';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (!session || !session.user) {
    return notFound();
  }

  if (session.user.id !== chat.userId) {
    return notFound();
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <div className="size-full flex flex-col overflow-hidden">
    <div className="flex-1 w-full relative">
      <PreviewChat
        id={chat.id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedModelId={selectedModelId}
      />
    </div>
  </div>
  );
}
