import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Yaswanth Raj';
  }, []);

  return (
    <PageLayout>
      <div className="mx-auto max-w-prose text-center">
        <h1 className="text-xl font-semibold text-ink">Page not found</h1>
        <p className="mt-3 text-[15px] text-muted">
          That address doesn't match anything here.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-[14px] text-accent underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </PageLayout>
  );
}
