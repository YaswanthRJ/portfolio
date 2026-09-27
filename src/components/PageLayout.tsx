import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="mx-auto max-w-content px-6 py-8 sm:px-10 lg:px-16">
      {children}
    </main>
  );
}