// chat-header.tsx
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { PlusIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { Contact2, HelpCircle } from 'lucide-react';
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
  onStartTour,
  
}: { 
  selectedModelId: string, 
  lastAIMessage?: string,
  block?: UIBlock, // Make block optional
  userEmail?: string 
  onStartTour: () => void,
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

  // Add these state variables
  const [showTour, setShowTour] = useState(false);

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
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-4 gap-2 flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SidebarToggle />
          {(!open || windowWidth < 768) && (
            <BetterTooltip content="New Chat">
              <Button
                variant="outline"
                className="order-2 md:order-1 h-9 md:h-10 px-2 md:px-3 ml-auto md:ml-0"
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
        </div>

        {/* <Button
        className="tour-btn h-10 md:h-12 px-3 ml-2"
        variant="outline"
        onClick={onStartTour}
      >
        <HelpCircle className="size-5" />
      </Button> */}


        
        <Button
          className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 
                     text-zinc-50 dark:text-zinc-900 w-full md:w-auto md:ml-auto
                     py-2 md:py-3 px-4 md:px-6 h-10 md:h-12 text-base md:text-lg font-medium 
                     rounded-lg transition-all duration-200 hover:scale-105 
                     flex items-center justify-center gap-2 md:gap-3
                     order-last md:order-none mt-2 md:mt-0 Contact"
          onClick={() => setTabsOpen(true)}
        >
          <Contact2 size={20} className="md:size-24" />
          <span>Contact Expert</span>
        </Button>
            <Button 
            className="tour-btn"
            variant="outline"
            onClick={() => {
              setDialogOpen(false);
              onStartTour();
            }}
          >
            <HelpCircle className="size-5" />
          </Button>
      </header>

     

      <Dialog open={tabsOpen} onOpenChange={setTabsOpen}>
        <DialogContent className="w-[95vw] max-w-[425px] p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Choose an Option</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="changes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-2">
              <TabsTrigger value="changes" className="px-2 py-1.5 md:px-4 md:py-2">
                Make Changes
              </TabsTrigger>
              <TabsTrigger value="contact" className="px-2 py-1.5 md:px-4 md:py-2">
                Contact Now
              </TabsTrigger>
            </TabsList>
            <TabsContent value="changes">
              <div className="space-y-3 md:space-y-4 p-2 md:p-4">
                <p className="text-sm md:text-base">Would you like to make any changes to your current plan?</p>
                <Button 
                  className="w-full h-9 md:h-10"
                  onClick={() => {
                    setTabsOpen(false);
                  }}
                >
                  Review Changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-3 md:space-y-4 p-2 md:p-4">
                <Button 
                  className="w-full h-9 md:h-10 bg-teal-500 hover:bg-teal-600"
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
        <DialogContent className="w-[95vw] max-w-[425px] p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Contact Expert</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4">
            <Input
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="h-9 md:h-10"
            />
            <Input
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`h-9 md:h-10 ${!validatePhoneNumber(phoneNumber) && phoneNumber ? 'border-red-500' : ''}`}
            />
            {!validatePhoneNumber(phoneNumber) && phoneNumber && (
              <p className="text-red-500 text-xs md:text-sm">Enter a valid phone number</p>
            )}
          </div>
          <DialogFooter className="mt-4 md:mt-6">
            <Button 
              className="w-full md:w-auto bg-teal-500 h-9 md:h-10" 
              onClick={handleContactExpert} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}