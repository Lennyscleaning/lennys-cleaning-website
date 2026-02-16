import Reveal from '@/components/ui/Reveal';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Get in touch</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Questions? Feedback? We\'d love to hear from you.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Reveal delay={0.1}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-forest-green">Email</h3>
                <p className="text-lg text-gray-700"><a href="mailto:eric@flowbotics.xyz" className="text-terracotta hover:underline">eric@flowbotics.xyz</a></p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-forest-green">Phone</h3>
                <p className="text-lg text-gray-700"><a href="tel:+12535551234" className="text-terracotta hover:underline">(253) 555-1234</a></p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}