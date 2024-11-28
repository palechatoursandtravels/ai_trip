// chat-header.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { PlusIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { Contact2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUserEmail } from '@/lib/db/actions';
import { UIBlock } from './block'; // Import UIBlock type

export function ChatHeader({ 
  selectedModelId, 
  lastAIMessage,
  block, // Add block to props
  userEmail 
}: { 
  selectedModelId: string, 
  lastAIMessage?: string,
  block?: UIBlock, // Make block optional
  userEmail?: string 
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const [currentUserEmail, setCurrentUserEmail] = useState(userEmail);

  const { width: windowWidth } = useWindowSize();

  // Fetch user email on component mount if not already provided
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (!currentUserEmail) {
        try {
          const email = await getCurrentUserEmail();
          setCurrentUserEmail(email);
        } catch (error) {
          console.error('Failed to fetch user email', error);
          toast.error('Could not retrieve user email');
        }
      }
    };

    fetchUserEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContactExpert = async () => {
    // Validate user email
    if (!currentUserEmail) {
      toast.error('User email is not available');
      return;
    }

    // Ensure you replace these with your actual EmailJS credentials
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error('Email configuration is missing');
      return;
    }

    try {
      // Current date in variable format
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

         // Get block title with fallback
         const blockTitle = block?.title || 'Itinerary_Palecha_Travels';

      // Capture the last document content (if available)
      const lastDocument = block && block.content 
        ? `\n\nDocument Content:\n${block.content}` 
        : '';

      // Send email with the last AI message, document content, and user email
      // eslint-disable-next-line import/no-named-as-default-member
      const result = await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_ID, 
        {
          current_date: currentDate,
          block_title: blockTitle,
          last_ai_message: lastAIMessage || 'No recent message',
          document_content: lastDocument,
          user_email: currentUserEmail,
        },
        PUBLIC_KEY
      );

      // Show success toast
      toast.success('Message sent to expert successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send message to expert');
    }
  };

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      {(!open || windowWidth < 768) && (
        <BetterTooltip content="New Chat">
          <Button
            variant="outline"
            className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
            onClick={() => {
              router.push('/');
              router.refresh();
            }}
          >
            <PlusIcon />
            <span className="md:sr-only">New Chat</span>
          </Button>
        </BetterTooltip>
      )}
      <ModelSelector
        selectedModelId={selectedModelId}
        className="order-1 md:order-2"
      />
      <Button
        className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        onClick={handleContactExpert}
      >
        <Contact2 size={16} className="mr-2" />
        Contact Expert
      </Button>
    </header>
  );
}