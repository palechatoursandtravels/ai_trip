import { Providers } from './providers';
import { ClientLayout } from './client-layout';
import './globals.css';
import { THEME_COLOR_SCRIPT } from './theme-script';










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
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
      <Providers>
        <ClientLayout>{children}</ClientLayout>
      </Providers>
      </body>
    </html>
  );
}
