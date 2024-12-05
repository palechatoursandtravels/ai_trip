import React from 'next';
import Form from 'next/form';

import { Input } from './ui/input';
import { Label } from './ui/label';

// Define a type for the action to ensure type safety
type AuthFormAction = 
  | string 
  | ((formData: FormData) => void | Promise<void>);

// Create an interface for component props
interface AuthFormProps {
  action: AuthFormAction;
  children: React.ReactNode;
  defaultEmail?: string;
  includeNameField?: boolean;
}

export function AuthForm({
  action,
  children,
  defaultEmail = '',
  includeNameField = false,
}: AuthFormProps) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
       {/* Conditionally Render Name Input */}
       {includeNameField && (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="name"
            className="text-zinc-600 font-normal dark:text-zinc-400"
          >
            Name
          </Label>

          <Input
            id="name"
            name="name"
            className="bg-muted text-md md:text-sm"
            type="text"
            placeholder="Your Full Name"
            required
            minLength={2}
            maxLength={50}
          />
        </div>
      )}
      
      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

     

      {/* Password Input */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>

        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          required
          minLength={6}
          maxLength={64}
        />
      </div>

      {/* Render children (submit button, links, etc.) */}
      {children}
    </Form>
  );
}