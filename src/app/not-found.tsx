import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-warm-white min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-[480px] text-center">
        <p className="font-display font-semibold text-[80px] text-forest/15 leading-none mb-4">
          404
        </p>
        <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-4 text-[clamp(28px,4vw,40px)]">
          This page wandered off
        </h1>
        <p className="font-body text-[17px] text-charcoal-light leading-relaxed mb-10">
          We couldn&apos;t find what you&apos;re looking for — but we can still help you find a great cleaning professional.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary text-base px-8 py-4"
          >
            Take me home →
          </Link>
          <Link
            href="/services/standard"
            className="font-body text-sm font-medium text-forest hover:text-forest-dark transition-colors"
          >
            Browse our services →
          </Link>
        </div>
      </div>
    </main>
  );
}
