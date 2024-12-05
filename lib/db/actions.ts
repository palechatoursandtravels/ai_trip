// actions.ts
'use server';

import { auth } from "@/app/(auth)/auth";
import { getUser } from "./queries";

; // Assuming this is the correct import from your queries file
 // Import your authentication helper

export async function getCurrentUserEmail() {
  // Get the current authenticated session
  const session = await auth();

  // If no session exists, throw an error
  if (!session || !session.user || !session.user.email) {
    throw new Error('No authenticated user found');
  }

  // Fetch the user from the database to ensure they exist
  const [existingUser] = await getUser(session.user.email);

  if (!existingUser) {
    throw new Error('User not found in database');
  }

  return session.user.email;
}

export async function getCurrentUsername() {
    const session = await auth();
  
    if (!session || !session.user || !session.user.email) {
      throw new Error('No authenticated user found');
    }
  
    // Extract username from email 
    // This method takes the part before the @ symbol
    const email = session.user.email;
    const username = email.split('@')[0];
  
    return username;
  }