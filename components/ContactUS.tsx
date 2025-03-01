/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default-member */
'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { toast } from 'sonner';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configError, setConfigError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [nameError, setNameError] = useState('');


  // // Log environment variables
  // console.log('EmailJS Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  // console.log('EmailJS Template ID:', process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID);
  // console.log('EmailJS Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

  // Environment variables directly included
  const EMAIL_JS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAIL_JS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
  const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    // Trim whitespace and check if all fields are non-empty
    const formFilled = 
      name.trim() !== '' && 
      email.trim() !== '' && 
      message.trim() !== '';
    
    setIsFormValid(formFilled);
  }, [name, email, message]);


  // Name validation function
  const validateName = (nameToValidate: string): boolean => {
    // Remove leading/trailing whitespace
    const trimmedName = nameToValidate.trim();

    // Check if name is empty
    if (trimmedName.length === 0) {
      setNameError('Name cannot be empty');
      return false;
    }

    // Regex for name validation
    // Allows letters, spaces, and hyphens
    // Requires at least two words with meaningful characters
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
    
    // Additional checks to prevent nonsense inputs
    const isValidFormat = nameRegex.test(trimmedName);
    const hasRepeatedChars = /(.)\1{3,}/.test(trimmedName); // Prevents excessive repeated characters
    const hasMeaningfulLength = trimmedName.length >= 4 && trimmedName.length <= 50;

    if (!isValidFormat) {
      setNameError('Please enter a valid full name (first and last name)');
      return false;
    }

    if (hasRepeatedChars) {
      setNameError('Name contains invalid repeated characters');
      return false;
    }

    if (!hasMeaningfulLength) {
      setNameError('Name must be between 4 and 50 characters');
      return false;
    }

    // Clear any previous error
    setNameError('');
    return true;
  };



  React.useEffect(() => {
    console.log('Component mounted');
    
    // Detailed environment variable check
    console.log('Service ID exists:', !!EMAIL_JS_SERVICE_ID);
    console.log('Template ID exists:', !!EMAIL_JS_TEMPLATE_ID);
    console.log('Public Key exists:', !!EMAIL_JS_PUBLIC_KEY);

    if (!EMAIL_JS_SERVICE_ID || !EMAIL_JS_TEMPLATE_ID || !EMAIL_JS_PUBLIC_KEY) {
      console.error('Email configuration is missing');
      setConfigError(true);
      toast.error('Email configuration is missing');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Revalidate all fields before submission
    const isNameValid = validateName(name);
    
    if (!isNameValid) {
      toast.error('Please correct the name field');
      return;
    }
    
    if (!isFormValid) {
      toast.error('Please fill out all fields');
      return;
    }

    console.log('Form submission started');
    console.log('Config Error:', configError);

    if (configError) {
      console.error('Cannot send email due to configuration error');
      toast.error('Cannot send email due to configuration error');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to send email via EmailJS');
      const result = await emailjs.send(
        EMAIL_JS_SERVICE_ID!, 
        EMAIL_JS_TEMPLATE_ID!, 
        {
          user_name: name,
          user_email: email,
          message: message
        },
        EMAIL_JS_PUBLIC_KEY!
      );

      console.log('Email send result:', result);

      toast.success('Message sent successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Email send error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:py-16 grainy" id="contact">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Information Side */}
          <div className="bg-teal-600 text-white p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Contact Us</h2>
            <p className="text-base md:text-lg mb-4 md:mb-6">
              Have questions or want to get started? 
              Drop us a message and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Form Side */}
          <div className="p-6 md:p-10">
            {configError ? (
              <div className="text-red-500 text-center">
                Email configuration error. Please contact support.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 md:size-5" />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 ${
                      nameError 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-teal-500'
                    }`}
                  />
                  {nameError && (
                    <p className="text-red-500 text-xs mt-1">{nameError}</p>
                  )}
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 md:size-5" />
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 text-gray-400 size-4 md:size-5" />
                  <textarea 
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 md:py-3 rounded-lg flex items-center justify-center text-sm md:text-base"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 size-4 md:size-5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;