import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { STUDIO_IMAGES } from '../data/seedData';

export function AboutPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Intro Split */}
      <section className="py-12 lg:py-20 border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                  Our Story &amp; Heritage
                </p>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#231F1D] leading-tight">
                  Rooted in Jaipur Workshops, Styled for London Homes
                </h1>
              </div>

              <p className="text-base text-[#6B5E54] leading-relaxed">
                Jaipur Block Studio was founded with a focused purpose: to bring authentic hand-block-printed Indian cotton textiles into modern UK living spaces without diluting the craft or pricing out everyday homeowners.
              </p>
              <p className="text-base text-[#6B5E54] leading-relaxed">
                Working directly with independent printing collectives in Sanganer and Bagru, we curate small-batch cotton cushion covers stamped by hand using carved teak blocks and earthy mineral pigments—terracotta madder, fermented indigo, turmeric mustard, and unbleached cotton cream.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors"
                >
                  <span>Explore the Cushion Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[340px] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#F2ECE1]">
                <SmartImage
                  src={STUDIO_IMAGES.craft}
                  alt="Artisan printing cotton cloth with carved woodblocks in Jaipur"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of Craft & Mission */}
      <section className="py-16 lg:py-20 bg-[#F2ECE1] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
              Craft &amp; Provenance
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#231F1D]">
              What Shapes Every Cushion Cover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-7 rounded-xl border border-[#E5DDD0] space-y-3">
              <h3 className="font-serif text-xl font-semibold text-[#231F1D]">
                The Heritage of Jaipur Block Printing
              </h3>
              <p className="text-sm text-[#6B5E54] leading-relaxed">
                For over three centuries, the towns of Sanganer and Bagru on the outskirts of Jaipur have been renowned for Chhipa hand-block printing. Unlike automated digital printing, every hue in a Jaipur block print requires its own precisely chiseled wooden block—often three to five blocks per cushion cover—aligned purely by the artisan’s eye.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#E5DDD0] space-y-3">
              <h3 className="font-serif text-xl font-semibold text-[#231F1D]">
                Supporting Local Artisans Directly
              </h3>
              <p className="text-sm text-[#6B5E54] leading-relaxed">
                Traditional woodblock printing faces intense pressure from cheap synthetic screen-printed imitations. By partnering directly with family-run printing studios and paying fair per-piece artisan rates, Jaipur Block Studio helps preserve generational carving and natural dyeing livelihoods.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#E5DDD0] space-y-3">
              <h3 className="font-serif text-xl font-semibold text-[#231F1D]">
                100% Organic Handloom Cotton
              </h3>
              <p className="text-sm text-[#6B5E54] leading-relaxed">
                Great craftsmanship deserves an enduring base. We print exclusively on breathable 230–260 GSM unbleached cotton and textured slub canvas, pre-washed for softness and finished with matching cotton piping and durable concealed brass zips.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#E5DDD0] space-y-3">
              <h3 className="font-serif text-xl font-semibold text-[#231F1D]">
                Designed for Modern UK Living
              </h3>
              <p className="text-sm text-[#6B5E54] leading-relaxed">
                London homeowners, boutique shoppers, and interior stylists seek warmth, provenance, and tactile character. Our palette balances rich Indian heritage motifs with calm travertine, oak, and linen tones suited to contemporary British flats and period terraces alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Banner */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E5DDD0] rounded-xl overflow-hidden">
            <div className="lg:col-span-6 aspect-[16/10] lg:h-full bg-[#F2ECE1]">
              <SmartImage
                src={STUDIO_IMAGES.hero}
                alt="London living room styled with Jaipur Block Studio cushions"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-8 sm:p-10 space-y-5">
              <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                Start Your Cushion Edit
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#231F1D]">
                Curated Sets at Accessible Artisan Pricing
              </h2>
              <p className="text-sm text-[#6B5E54] leading-relaxed">
                By focusing exclusively on handmade Jaipur block-printed 45 × 45 cm cotton cushion covers in our initial collection, we maintain strict quality control and fair pricing—starting at ₹2,500 per cover.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/shop"
                  className="px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
                >
                  Shop Cushion Covers
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 text-sm font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors"
                >
                  Contact Our Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
