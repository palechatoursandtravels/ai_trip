import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  
  title: {
    default: 'AI Travel Assistant Travel Buddy | Palecha Tours and Travels',
    template: '%s | Palecha Tours and Travels'
  },
  description: 'Travel hassle-free, and explore the world with personalized AI-powered recommendations',
  keywords: [
    'AI travel assistant',
    'personalized travel',
    'travel recommendations',
    'tour planning',
    'travel technology',
    'book flights directly with help of AI',
    "Get best fight deals with AI Travel Assistant and our Palecha Tours and Travels",
    "Travel Buddy your AI travel Companion"
  ],
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cstyle%3E.compass%7Bfill:%2310B981;stroke:%23064E3B;stroke-width:5;%7D%3C/style%3E%3Cpath class='compass' d='M50 10 L65 45 L95 50 L65 55 L50 90 L35 55 L5 50 L35 45 Z M50 30 L57 45 L72 47 L57 50 L50 65 L43 50 L28 47 Z' /%3E%3C/svg%3E",
        type: 'image/svg+xml'
      }
    ],
    shortcut: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cstyle%3E.compass%7Bfill:%2310B981;stroke:%23064E3B;stroke-width:5;%7D%3C/style%3E%3Cpath class='compass' d='M50 10 L65 45 L95 50 L65 55 L50 90 L35 55 L5 50 L35 45 Z M50 30 L57 45 L72 47 L57 50 L50 65 L43 50 L28 47 Z' /%3E%3C/svg%3E",
        type: 'image/svg+xml'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('light');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          >
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
