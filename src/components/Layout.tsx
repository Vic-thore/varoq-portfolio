import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { PageMeta } from './PageMeta';
import { ConsentBanner } from './ConsentBanner';

export function Layout() {
  return (
    <>
      <PageMeta />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </>
  );
}
