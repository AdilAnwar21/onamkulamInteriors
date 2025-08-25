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
  // { id: 6, name: "UrbanFlow", logo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=140&fit=crop&crop=center" },
];

type Props = {
  partners?: Partner[];
  autoplayMs?: number; // default 2500
};

const TrustedPartners: React.FC<Props> = ({ partners = DEFAULT_PARTNERS, autoplayMs = 2500 }) => {
  // ---- responsive items per view
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

  // We start on the middle copy to allow seamless left/right movement
  const START_INDEX = baseLen;
  const [index, setIndex] = useState(START_INDEX);
  const [withTransition, setWithTransition] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // ---- Autoplay (one-step slide like Owl)
  useEffect(() => {
    if (isHover) return; // pause on hover/drag
    const t = setInterval(() => goTo(index + 1), autoplayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isHover, autoplayMs, itemsPerView]);

  // ---- Core move function with loop reset (no blink)
  const stepPercent = 100 / itemsPerView; // translate per item
  function goTo(nextIndex: number) {
    setWithTransition(true);
    setIndex(nextIndex);
  }

  // After every transition, if we’re in a cloned region, snap back (no transition)
  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;

    const onEnd = () => {
      // If we moved past the end of the middle copy, snap back
      if (index >= START_INDEX + baseLen) {
        setWithTransition(false);
        setIndex((prev) => prev - baseLen);
        // force reflow so transition toggle takes effect
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      }
      // If we moved before start of middle copy, snap forward
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, baseLen]);

  // ---- Drag / swipe (pointer events)
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
    const percentDelta = (dx / containerWidth) * 100; // how many % of container moved
    const stepsFloat = percentDelta / stepPercent;     // how many items offset visually
    setIndex(Math.round(startIndex.current - stepsFloat * 1000) / 1000); // allow smooth while dragging
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    dragging.current = false;
    setWithTransition(true);

    const dx = e.clientX - startX.current;
    const containerWidth = containerRef.current.clientWidth;
    const percentDelta = (dx / containerWidth) * 100;
    const stepsFloat = percentDelta / stepPercent;

    // If dragged beyond threshold, move by at least 1 item in that direction
    const step = stepsFloat > 0 ? Math.ceil(stepsFloat) : Math.floor(stepsFloat);
    const next = startIndex.current - step;
    // Snap to integer index
    goTo(Math.round(next));
    // resume autoplay after a short moment
    setTimeout(() => setIsHover(false), 400);
  };

  // prevent text/image dragging ghost
  const onDragStart = (e: React.DragEvent) => e.preventDefault();

  // ---- Calculate translate
  const translate = `translateX(-${index * stepPercent}%)`;
  const transitionCls = withTransition ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]" : "";

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/partners-bg.png')" }} // put your bg in /public
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Constrain between orange bars (14.2% sides → 71.6% center) */}
      <div className="relative w-[71.6%] mx-auto">
        {/* Heading */}
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

        {/* Carousel */}
        <div
          ref={containerRef}
          className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
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

        {/* Dots (optional, simple indicator) */}
        {/* <div className="mt-6 flex justify-center gap-2">
          {base.map((_, i) => {
            // map current virtual index to base index
            const activeBaseIndex = ((Math.round(index) % baseLen) + baseLen) % baseLen;
            const active = i === activeBaseIndex;
            return (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${active ? "w-6 bg-orange-500" : "w-2 bg-gray-300"}`}
              />
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default TrustedPartners;
