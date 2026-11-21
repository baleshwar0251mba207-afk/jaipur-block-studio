import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { SAMPLE_TESTIMONIALS, STUDIO_IMAGES } from '../data/seedData';
import { validateEmail } from '../utils/format';

const BLOCK_PRINTING_STEPS = [
  {
    step: '01',
    title: 'Hand-Carved Teak Woodblocks',
    description:
      'Master carvers in Jaipur chisel floral, paisley, and geometric motifs into seasoned sheesham and teak timber blocks, soaked in mustard oil to prevent warping.',
  },
  {
    step: '02',
    title: 'Natural & Mineral Dye Vat Mixing',
    description:
      'Artisans prepare pigments from fermented indigo, madder root terracotta, turmeric mustard, and pomegranate rind for rich, breathable colour.',
  },
  {
    step: '03',
    title: 'Rhythmic Hand-Stamping',
    description:
      'Every cushion cover is stamped layer by layer onto unbleached handloom cotton. Subtle registration variations mark genuine human handiwork.',
  },
  {
    step: '04',
    title: 'Sun-Curing & Tailored Finishing',
    description:
      'Printed cloth is washed, sun-cured in Jaipur light to lock in pigment fastness, and tailored with neat contrast piping and concealed brass zips.',
  },
];

const WHY_CHOOSE_US = [
  {
    title: 'Handmade Quality',
    detail:
      'Each cover is stamped individually by hand on padded printing tables rather than rotary factory machines.',
  },
  {
    title: '100% Organic Cotton',
    detail:
      'Woven in breathable 230–260 GSM slub and handloom cotton that softens gracefully with seasonal UK laundering.',
  },
  {
    title: 'Unique Heritage Patterns',
    detail:
      'Sanganer florals, Bagru dabu paisleys, and architectural jali lattices curated for modern British living rooms.',
  },
  {
    title: 'Skilled Indian Craftsmanship',
    detail:
      'Direct partnerships with multi-generational Jaipur printing families ensure fair wages and living craft continuity.',
  },
];

export function HomePage() {
  const { products, subscribeNewsletter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(newsletterEmail)) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter a valid email address to subscribe.',
      });
      return;
    }
    const result = subscribeNewsletter(newsletterEmail);
    setNewsletterStatus({
      type: 'success',
      message: result.message,
    });
    setNewsletterEmail('');
  };

  return (
    <div>
      {/* 1. Storefront Hero */}
      <section className="bg-[#FAF7F2] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                  Jaipur Heritage · Curated for London Homes
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#231F1D] leading-[1.12] tracking-tight">
                  Bring the Beauty of Jaipur into Your Home.
                </h1>
                <p className="text-base text-[#6B5E54] leading-relaxed max-w-lg">
                  Handmade block-printed cotton cushion covers crafted by skilled Rajasthan artisans using centuries-old woodblock techniques, tailored for modern UK interiors.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors min-h-[44px]"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-5 py-3 text-sm font-medium border border-[#D4C8B8] text-[#231F1D] rounded-md hover:bg-[#F2ECE1] transition-colors min-h-[44px]"
                >
                  Explore Our Craft
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5DDD0] grid grid-cols-3 gap-4 text-xs text-[#6B5E54]">
                <div>
                  <span className="block font-semibold text-[#231F1D]">100% Cotton</span>
                  <span>240 GSM handloom</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#231F1D]">Hand-Stamped</span>
                  <span>Sanganer &amp; Bagru</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#231F1D]">UK Delivery</span>
                  <span>Tracked from £0*</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[320px] lg:min-h-[460px] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#F2ECE1]">
                <SmartImage
                  src={STUDIO_IMAGES.hero}
                  alt="Modern London living room sofa styled with Jaipur Block Studio handmade cotton cushion covers in indigo, terracotta, and mustard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Cushion Cover Collection */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
                Signature Cushion Collection
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
                Handmade Jaipur Cushion Covers
              </h2>
              <p className="text-sm sm:text-base text-[#6B5E54]">
                Standard 45 × 45 cm covers in natural indigo, terracotta, and mustard tones—designed to layer effortlessly across sofas, daybeds, and reading chairs.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B8533A] hover:text-[#9B412B] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Traditional Block-Printing Process & Why Choose Us */}
      <section className="py-16 lg:py-20 bg-[#F2ECE1] border-y border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5">
              <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#E5DDD0]">
                <SmartImage
                  src={STUDIO_IMAGES.craft}
                  alt="Master Indian block printer in Jaipur stamping a carved wooden block dipped in indigo and terracotta dye onto natural cotton"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                  Traditional Jaipur Process
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
                  From Hand-Carved Timber to Your Sofa
                </h2>
                <p className="text-sm sm:text-base text-[#6B5E54]">
                  Every pattern requires weeks of woodblock carving and days of patient, layer-by-layer printing under the Rajasthan sun.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BLOCK_PRINTING_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E5DDD0] space-y-2"
                  >
                    <span className="font-mono text-xs font-medium text-[#B8533A]">
                      {item.step}.
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#231F1D]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6B5E54] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-[#DFD5C5]">
            <div className="max-w-xl mb-8 space-y-2">
              <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
                Why Choose Jaipur Block Studio
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#231F1D]">
                Craftsmanship Built for Everyday Living
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_US.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white p-6 rounded-lg border border-[#E5DDD0] space-y-2"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#231F1D]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6B5E54] leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sample Customer Testimonials & Newsletter */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                  Sample Customer Reviews (Illustrative MVP Feedback)
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#231F1D]">
                  Styled Across London Homes
                </h2>
              </div>
              <span className="text-xs text-[#6B5E54]">
                Reviews shown are clearly labelled sample customer stories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAMPLE_TESTIMONIALS.map((review) => (
                <blockquote
                  key={review.id}
                  className="bg-white p-6 rounded-lg border border-[#E5DDD0] flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-[#1E3A5F]">
                      {review.label} · {review.productPurchased}
                    </p>
                    <p className="text-sm text-[#231F1D] leading-relaxed">
                      “{review.quote}”
                    </p>
                  </div>
                  <footer className="pt-4 border-t border-[#EFE7DA]">
                    <p className="text-sm font-semibold text-[#231F1D]">{review.name}</p>
                    <p className="text-xs text-[#6B5E54]">{review.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3A5F] text-[#FAF7F2] rounded-xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#E5B85C]">
                  Studio Journal &amp; Small-Batch Releases
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                  Receive New Block-Print Releases &amp; Care Notes
                </h2>
                <p className="text-sm text-[#D8E1EC] max-w-xl leading-relaxed">
                  Join London interior stylists and homeowners receiving early notice when small-batch Sanganer and Bagru cushion runs arrive in the UK.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="you@londonhome.co.uk"
                      className="flex-1 px-4 py-3 text-sm bg-white text-[#231F1D] placeholder:text-[#6B5E54] rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C48B22]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterStatus && (
                    <p
                      className={`text-xs flex items-center gap-1.5 ${
                        newsletterStatus.type === 'success'
                          ? 'text-[#E5F2E8]'
                          : 'text-[#FFD5CC]'
                      }`}
                    >
                      {newsletterStatus.type === 'success' && (
                        <Check className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>{newsletterStatus.message}</span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
