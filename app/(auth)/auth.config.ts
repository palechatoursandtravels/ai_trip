import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/landingPage',
    newUser: '/onbaording',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRoot = nextUrl.pathname === '/landingPage';
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isApiRequest = nextUrl.pathname.startsWith('/api/');

      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnboarding = nextUrl.pathname.startsWith('/onboarding');
      const isOnPrivacy = nextUrl.pathname === '/privacyPolicy';
      const isOnTerms = nextUrl.pathname === '/termsConditions';

      // API requests should always return, never redirect
      if (isApiRequest) {
        return isLoggedIn;
      }

      if (isOnPrivacy) return true;
      if(isOnTerms) return true;

      if (isOnRoot) return true; // Allow access to landing page

      // if(isOnboarding) {
      //   if (isLoggedIn) return true;
      //   return false;
      // }

      if (isOnboarding) {
        if (isLoggedIn) {
          // Instead of checking localStorage or cookies, just allow access to onboarding
          // The client-side navigation will handle redirecting if onboarding is complete
          return true;
        }
        return false;
      }

       
     

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/onboarding', nextUrl as unknown as URL));
      }

   

      if (isOnRegister || isOnLogin) {
        return true; // Always allow access to register and login pages
      }

      if (isOnChat) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }


      if (isLoggedIn) {
        return Response.redirect(new URL('/onboarding', nextUrl as unknown as URL));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;