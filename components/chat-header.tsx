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
import { Contact2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUserEmail } from '@/lib/db/actions';
import { UIBlock } from './block'; // Import UIBlock type
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ChatHeader({ 
  selectedModelId, 
  lastAIMessage,
  block, // Add block to props
  userEmail,
  
}: { 
  selectedModelId: string, 
  lastAIMessage?: string,
  block?: UIBlock, // Make block optional
  userEmail?: string 
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const [currentUserEmail, setCurrentUserEmail] = useState(userEmail);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabsOpen, setTabsOpen] = useState(false);

  const { width: windowWidth } = useWindowSize();
  const [isSubmitting, setIsSubmitting] = useState(false);

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


  const beautifyContent = (content: string) => {
    return content
      .replace(/#+\s*/g, '') // Remove headings like ###
      .replace(/-{3,}/g, '') // Remove horizontal lines
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .trim(); // Remove leading/trailing spaces
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$|^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  
  const handleContactExpert = async () => {

    if (!userName || !phoneNumber) {
      toast.error('Name and phone number are required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Validate user email
    if (!currentUserEmail) {
      toast.error('User email is not available');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

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
        ? beautifyContent(block.content)
        : 'No content available';

        const beautifiedMessage = lastAIMessage
        ? beautifyContent(lastAIMessage)
        : 'No recent message';

      // Send email with the last AI message, document content, and user email
      // eslint-disable-next-line import/no-named-as-default-member
      const result = await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_ID, 
        {
          current_date: currentDate,
          block_title: blockTitle,
          last_ai_message: beautifiedMessage || 'No recent message',
          document_content: lastDocument,
          user_email: currentUserEmail,
          user_name: userName,
          phone_number: phoneNumber,
        },
        PUBLIC_KEY
      );

      // Show success toast
      toast.success('Message sent to expert successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send message to expert');
    }finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <>
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
        <Button
          className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-3 px-6 h-12 text-lg font-medium order-4 md:ml-auto rounded-lg transition-all duration-200 hover:scale-105"
          onClick={() => setTabsOpen(true)}
        >
          <Contact2 size={24} className="mr-3" />
          Contact Expert
        </Button>
      </header>

      <Dialog open={tabsOpen} onOpenChange={setTabsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose an Option</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="changes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="changes">Make Changes</TabsTrigger>
              <TabsTrigger value="contact">Contact Now</TabsTrigger>
            </TabsList>
            <TabsContent value="changes">
              <div className="space-y-4 p-4">
                <p>Would you like to make any changes to your current plan?</p>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setTabsOpen(false);
                    // Add logic for handling changes
                  }}
                >
                  Review Changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-4 p-4">
                <Button 
                  className="w-full bg-teal-500 hover:bg-teal-600"
                  onClick={() => {
                    setTabsOpen(false);
                    setDialogOpen(true);
                  }}
                >
                  Contact Expert Now
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Expert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={!validatePhoneNumber(phoneNumber) && phoneNumber ? 'border-red-500' : ''}
            />
            {!validatePhoneNumber(phoneNumber) && phoneNumber && (
              <p className="text-red-500 text-sm">Enter a valid phone number</p>
            )}
          </div>
          <DialogFooter>
            <Button className="bg-teal-500" onClick={handleContactExpert} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}