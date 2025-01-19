import { NextResponse } from 'next/server';
import { saveOnboardingData as saveOnboardingToDb } from '@/lib/db/queries';
import { auth } from '@/app/(auth)/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { onboardingData } = await req.json();
    
    if (!onboardingData) {
      return new NextResponse('Invalid request data', { status: 400 });
    }

    await saveOnboardingToDb({
      userId: session.user.id,
      data: onboardingData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}