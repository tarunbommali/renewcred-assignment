import './globals.css';
import ReduxProvider from '@/redux/provider';

export const metadata = {
  title: 'RenewCred - Web3 & IoT Powered Carbon MRV CMS',
  description: 'Production-ready Content Management System (CMS) for RenewCred climate action web platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
