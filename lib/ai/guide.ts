// types/guide.ts

export interface GuideStep {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }
  
  export interface GuideProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface GuideStepProps {
    step: GuideStep;
    stepNumber: number;
    totalSteps: number;
  }