import { NextResponse } from 'next/server';
import { getOnboardingDataByUserId } from '@/lib/db/queries';
import { auth } from '@/app/(auth)/auth';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  
  try {
    const session = await auth();
    
    // Always return JSON for API requests
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    const data = await getOnboardingDataByUserId({ userId: session.user.id });
    
    if (!data) {
      return NextResponse.json(
        { error: 'No onboarding data found', code: 'NO_DATA' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error fetching onboarding data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}