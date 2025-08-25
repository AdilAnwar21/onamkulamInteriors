import React, { useEffect, useMemo, useRef, useState } from "react";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const DEFAULT_PARTNERS: Partner[] = [
  { id: 1, name: "CraftGenic", logo: "./img/logo/logo-1.png" },
  { id: 2, name: "Design Ripple", logo: "./img/logo/logo-2.png" },
  { id: 3, name: "Neural Construct", logo: "./img/logo/logo-3.png" },
  { id: 4, name: "Rebel Architect", logo: "./img/logo/logo-5.png" },
  { id: 5, name: "ModernSpace", logo: "./img/logo/logo-1.png" },
];

type Props = {
  partners?: Partner[];
  autoplayMs?: number; // default 2500
};

const TrustedPartners: React.FC<Props> = ({ partners = DEFAULT_PARTNERS, autoplayMs = 2500 }) => {
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const setCount = () => {
      const w = window.innerWidth;
      if (w <= 360) setItemsPerView(2);
      else if (w <= 576) setItemsPerView(3);
      else if (w <= 992) setItemsPerView(4);
      else setItemsPerView(5);
    };
    setCount();
    window.addEventListener("resize", setCount);
    return () => window.removeEventListener("resize", setCount);
  }, []);

  const base = partners;
  const tripled = useMemo(() => [...base, ...base, ...base], [base]);
  const baseLen = base.length;

  const START_INDEX = baseLen;
  const [index, setIndex] = useState(START_INDEX);
  const [withTransition, setWithTransition] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHover) return;
    const t = setInterval(() => goTo(index + 1), autoplayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isHover, autoplayMs, itemsPerView]);

  const stepPercent = 100 / itemsPerView;
  function goTo(nextIndex: number) {
    setWithTransition(true);
    setIndex(nextIndex);
  }

  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const onEnd = () => {
      if (index >= START_INDEX + baseLen) {
        setWithTransition(false);
        setIndex((prev) => prev - baseLen);
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      }
      if (index < START_INDEX) {
        setWithTransition(false);
        setIndex((prev) => prev + baseLen);
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [index, baseLen]);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(index);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startIndex.current = index;
    setIsHover(true);
    setWithTransition(false);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const dx = e.clientX - startX.current;
    const containerWidth = containerRef.current.clientWidth;
    const percentDelta = (dx / containerWidth) * 100;
    const stepsFloat = percentDelta / stepPercent;
    setIndex(Math.round(startIndex.current - stepsFloat * 1000) / 1000);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    dragging.current = false;
    setWithTransition(true);

    const dx = e.clientX - startX.current;
    const containerWidth = containerRef.current.clientWidth;
    const percentDelta = (dx / containerWidth) * 100;
    const stepsFloat = percentDelta / stepPercent;

    const step = stepsFloat > 0 ? Math.ceil(stepsFloat) : Math.floor(stepsFloat);
    const next = startIndex.current - step;
    goTo(Math.round(next));
    setTimeout(() => setIsHover(false), 400);
  };

  const onDragStart = (e: React.DragEvent) => e.preventDefault();

  const translate = `translateX(-${index * stepPercent}%)`;
  const transitionCls = withTransition
    ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    : "";

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/testimonial-bg.jpg')" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative w-[65%] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            OUR TRUSTED PARTNERS
          </h2>
          <div className="flex justify-center mt-3">
            <svg width="240" height="22" viewBox="0 0 240 22" fill="none" aria-hidden="true">
              <path d="M6 17C66 6 174 6 234 17" stroke="#C9732A" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Carousel with reduced width (added px padding) */}
        <div
          ref={containerRef}
          className="overflow-hidden select-none cursor-grab active:cursor-grabbing px-6 md:px-10"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDragStart={onDragStart}
        >
          <div
            ref={trackRef}
            className={`flex gap-10 ${transitionCls}`}
            style={{ transform: translate, willChange: "transform" }}
          >
            {tripled.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="shrink-0 flex items-center justify-center"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-16 sm:max-h-20 md:max-h-24 object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
