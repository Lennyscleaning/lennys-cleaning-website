import Reveal from '@/components/ui/Reveal';

export default function TrustBar() {
  return (
    <section className="py-12 px-6 bg-gradient-to-r from-terracotta to-orange-500 text-white">
      <div className="container-site">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Reveal delay={0.1}>
            <div>
              <div className="text-3xl font-display font-bold mb-1">500+</div>
              <p className="text-white text-opacity-90">Happy customers</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <div className="text-3xl font-display font-bold mb-1">4.9★</div>
              <p className="text-white text-opacity-90">Average rating</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <div className="text-3xl font-display font-bold mb-1">100%</div>
              <p className="text-white text-opacity-90">Guarantee</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}