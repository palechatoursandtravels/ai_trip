// types/auth.ts


export type AuthFormAction = 
  | ((formData: FormData) => void | Promise<void>)
  | string;

export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface AuthButtonProps {
    provider: 'google' | 'apple';
    onClick: () => void;
    disabled?: boolean;
  }
  
  export interface SignUpFormProps {
    onSubmit: (data: SignUpFormData) => void;
    isLoading?: boolean;
    error?: string;
  }