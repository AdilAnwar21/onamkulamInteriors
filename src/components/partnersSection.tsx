import React, { useEffect, useRef, useState } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const ExclusiveBrandsComplete: React.FC<{ scrollProgress?: number }> = () => {
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  // per-section progress (0..1)
  const [titleP, setTitleP] = useState(0);
  const [gridP, setGridP] = useState(0);
  const [partnersP, setPartnersP] = useState(0);
  const [quoteP, setQuoteP] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const exclusiveBrands: Brand[] = [
    {
      name: 'MERIDIANI',
      position: 'top-left',
      description:
        'Italian luxury furniture brand known for sophisticated contemporary design and exceptional craftsmanship.',
      founded: '1996',
      specialty: 'Contemporary Furniture',
    },
    {
      name: 'Frigerio',
      position: 'top-right',
      description:
        'Premium Italian furniture manufacturer specializing in upholstered seating and elegant living solutions.',
      founded: '1941',
      specialty: 'Upholstered Furniture',
    },
    {
      name: 'FIAM',
      position: 'bottom-left',
      description:
        'Innovative glass furniture design company creating stunning curved and artistic glass pieces.',
      founded: '1973',
      specialty: 'Glass Furniture',
    },
    {
      name: 'SANGIACOMO',
      position: 'bottom-right',
      description:
        'Modern Italian furniture brand offering contemporary storage solutions and bedroom furniture.',
      founded: '1968',
      specialty: 'Storage Solutions',
    },
  ];

  const partners = [
    { name: 'GAGGENAU', logo: 'GAGGENAU' },
    { name: 'SUB-ZERO', logo: 'SUB•ZERO' },
    { name: 'smeg', logo: '•••smeg' },
    { name: 'LIEBHERR', logo: 'LIEBHERR' },
    { name: 'hansgrohe', logo: 'hansgrohe' },
    { name: 'MIELE', logo: 'MIELE' },
    { name: 'BOSCH', logo: 'BOSCH' },
    { name: 'SIEMENS', logo: 'SIEMENS' },
  ];

  // compute progress for an element: 0 when below viewport, 1 when at or above top
  const computeProgressFor = (el: HTMLDivElement | null) => {
    if (!el || typeof window === 'undefined') return 0;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // progress goes from 0 (element.top == vh) to 1 (element.top == 0)
    const p = (vh - rect.top) / vh;
    return clamp(p, 0, 1);
  };

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!mounted) return;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setTitleP((prev) => {
            const val = computeProgressFor(titleRef.current);
            return Math.round(val * 1000) / 1000;
          });
          setGridP((prev) => {
            const val = computeProgressFor(gridRef.current);
            return Math.round(val * 1000) / 1000;
          });
          setPartnersP((prev) => {
            const val = computeProgressFor(partnersRef.current);
            return Math.round(val * 1000) / 1000;
          });
          setQuoteP((prev) => {
            const val = computeProgressFor(quoteRef.current);
            return Math.round(val * 1000) / 1000;
          });
          ticking = false;
        });
      }
    };

    // initial measure
    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mounted]);

  // brand stagger: each brand reveals slightly after previous
  const brandProgressForIndex = (index: number) => {
    const stagger = 0.14; // smaller -> more overlap, larger -> more sequential
    const start = index * stagger;
    // remap gridP so that when gridP == start => 0, when gridP == 1 => 1
    const p = (gridP - start) / (1 - start);
    return clamp(p, 0, 1);
  };

  // marquee CSS: placed in component so copy-paste works without extra CSS files
  const marqueeDuration = Math.max(10, 24 - partnersP * 12); // shorten duration as partners enter view

  if (!mounted) return null;

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <style>{`
        /* marquee keyframes (duplicate items technique) */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          overflow: hidden;
          width: 100%;
        }
        .marquee-inner {
          display: flex;
          gap: 2rem;
          width: calc(200%); /* because we duplicate items */
          animation: marquee ${marqueeDuration}s linear infinite;
        }

        /* small responsive tweaks */
        @media (max-width: 640px) {
          .brand-title { font-size: 1.125rem; }
          .section-title { font-size: 1.75rem; }
        }
      `}</style>

      {/* EXCLUSIVE BRANDS SECTION */}
      <section ref={titleRef} className="min-h-screen flex flex-col justify-start items-center px-6 md:px-12 py-16">
        <div
          className="mb-8 text-center"
          style={{
            transform: `translateY(${(1 - titleP) * 40}px)`,
            opacity: titleP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
          }}
        >
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider">OUR EXCLUSIVE BRANDS</h2>
        </div>

        <div
          ref={gridRef}
          className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          aria-hidden={gridP === 0}
        >
          {exclusiveBrands.map((brand, i) => {
            const p = brandProgressForIndex(i);
            return (
              <button
                key={brand.name}
                onClick={() => {
                  // placeholder: you can open modal or route here
                  // e.g., setSelectedBrand(brand)
                  // but keep button to be keyboard accessible
                }}
                className="bg-gray-900/80 rounded-2xl p-5 md:p-8 text-center cursor-pointer transform transition"
                style={{
                  transform: `translateY(${(1 - p) * 30}px) scale(${0.95 + 0.05 * p})`,
                  opacity: p,
                  transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms',
                  // small delay to emulate cascade if element suddenly becomes visible
                  transitionDelay: `${i * 70}ms`,
                }}
                aria-label={`View ${brand.name}`}
              >
                <h3 className="brand-title text-xl md:text-2xl font-light">{brand.name}</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-4 opacity-60" />
              </button>
            );
          })}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section ref={partnersRef} className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16">
        <div
          className="mb-8 text-center"
          style={{
            transform: `translateY(${(1 - partnersP) * 30}px)`,
            opacity: partnersP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
          }}
        >
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider">OUR PARTNERS</h2>
        </div>

        <div
          className="w-full max-w-7xl marquee"
          style={{ opacity: partnersP, transition: 'opacity 350ms' }}
        >
          <div
            className="marquee-inner"
            style={{
              // if you want dynamic speed: CSS animation's duration is set in the style tag above (inlined)
              // the inner content duplications:
            }}
          >
            {/* duplicate partners array twice for seamless scroll */}
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="min-w-[220px] md:min-w-[280px] h-36 md:h-48 bg-gray-900/60 rounded-2xl flex items-center justify-center"
              >
                <h3 className="text-lg md:text-2xl font-light">{p.logo}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section ref={quoteRef} className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center">
        <div
          style={{
            transform: `translateY(${(1 - quoteP) * 30}px)`,
            opacity: quoteP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
            maxWidth: '80ch',
          }}
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed">
            With unlimited creativity, <span className="italic">we transform your vision</span>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default ExclusiveBrandsComplete;
