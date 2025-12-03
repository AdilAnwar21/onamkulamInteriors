import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import FloatingNavbar from "./components/FloatingNavbar";
import Achievements from "./components/Achievements";
import ExclusiveBrands from "./components/partnersSection";
import TestimonialScroll from "./components/Testimonials";
import ServicesScroll from "./components/Services";
import Quote from "./components/Quote";
import ServicesShowcase from "./components/ServicesShowcase";
import Founder from "./components/Founder";
import Team from "./components/Team";
import CTASection from "./components/CTASection";
import LatestProjects from "./components/LatestProjects";
import Footer from "./components/Footer";

// --- STYLES ---
const layerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  perspective: 1000,
  transformStyle: 'preserve-3d',
  display: 'none',
};

function App() {
  const [loading, setLoading] = useState(true);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  // --- REFS ---
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollTargets = useRef({ cta: 0, latestProjects: 0 });

  // --- STATE ---
  const [progress, setProgress] = useState({
    brands: 0,
    testimonials: 0,
    services: 0,
    quote: 0
  });

  // --- HEIGHT CALCULATION ---
  const { totalHeight } = useMemo(() => {
    const heroHeightVal = Math.min(windowHeight, 800);
    const sectionDurationVal = heroHeightVal;
    const displayDurationVal = heroHeightVal * 0.8;

    const achievementsStart = heroHeightVal * 0.5;
    const achievementsDisplayEnd = achievementsStart + sectionDurationVal + displayDurationVal;
    
    const brandsStart = achievementsDisplayEnd;
    const brandsDisplayEnd = brandsStart + sectionDurationVal + (displayDurationVal * 8);

    const testimonialsStart = brandsDisplayEnd;
    const testimonialsDisplayEnd = testimonialsStart + sectionDurationVal + (displayDurationVal * 2.2);

    const servicesScrollStart = testimonialsDisplayEnd;
    const servicesScrollDisplayEnd = servicesScrollStart + sectionDurationVal + (displayDurationVal * 2);

    const quoteStart = servicesScrollDisplayEnd;
    const quoteCompleteEnd = quoteStart + sectionDurationVal + (displayDurationVal * 1.8) + (displayDurationVal * 0.7);

    const servicesShowcaseStart = quoteCompleteEnd;
    const servicesShowcaseDisplayEnd = servicesShowcaseStart + sectionDurationVal + displayDurationVal;

    const founderStart = servicesShowcaseDisplayEnd;
    const founderDisplayEnd = founderStart + sectionDurationVal + displayDurationVal;

    const teamStart = founderDisplayEnd;
    const teamDisplayEnd = teamStart + sectionDurationVal + displayDurationVal;

    const ctaStart = teamDisplayEnd;
    const ctaDisplayEnd = ctaStart + sectionDurationVal + displayDurationVal;

    const latestProjectsStart = ctaDisplayEnd;
    const latestProjectsDisplayEnd = latestProjectsStart + sectionDurationVal + displayDurationVal;
    
    // Total height ends after footer
    const footerEnd = latestProjectsDisplayEnd + heroHeightVal * 2;

    return { totalHeight: footerEnd };
  }, [windowHeight]);

  // --- ANIMATION LOOP ---
  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const loop = () => {
      const scrollY = window.scrollY;
      const heroHeightVal = Math.min(windowHeight, 800);
      const sectionDurationVal = heroHeightVal;
      const displayDurationVal = heroHeightVal * 0.8;

      const calculateOffset = (start: number) => {
        const relativeScroll = scrollY - start;
        return Math.min(heroHeightVal, Math.max(0, relativeScroll));
      };

      const updateEl = (key: string, offset: number, visible: boolean, zIndex: number, isHero = false) => {
        const el = sectionsRef.current[key];
        if (el) {
          const displayStyle = visible ? 'block' : 'none';
          if (el.style.display !== displayStyle) el.style.display = displayStyle;

          if (visible) {
            const yPos = isHero ? -offset : heroHeightVal - offset;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            el.style.zIndex = zIndex.toString();
          }
        }
      };

      // 1. HERO
      const heroEnd = heroHeightVal * 0.9;
      updateEl('hero', Math.min(scrollY * 0.4, heroHeightVal * 0.4), scrollY < heroEnd + sectionDurationVal, 10, true);

      // 2. ACHIEVEMENTS
      const achievementsStart = heroHeightVal * 0.5;
      const achievementsDisplayEnd = achievementsStart + sectionDurationVal + displayDurationVal;
      updateEl('achievements', calculateOffset(achievementsStart), scrollY >= achievementsStart && scrollY < achievementsDisplayEnd + sectionDurationVal, 20);

      // 3. BRANDS
      const brandsStart = achievementsDisplayEnd;
      const brandsSlideEndVal = brandsStart + sectionDurationVal;
      const brandsInternalScrollDuration = displayDurationVal * 8; 
      const brandsDisplayEnd = brandsSlideEndVal + brandsInternalScrollDuration;
      const rawBrandsProgress = Math.max(0, scrollY - brandsSlideEndVal) / brandsInternalScrollDuration;
      const brandsProgressVal = Math.min(1, rawBrandsProgress);
      updateEl('brands', calculateOffset(brandsStart), scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDurationVal, 30);

      // 4. TESTIMONIALS
      const testimonialsStart = brandsDisplayEnd;
      const testimonialsSlideEndVal = testimonialsStart + sectionDurationVal;
      const testimonialsDisplayEnd = testimonialsSlideEndVal + displayDurationVal * 2.2;
      const testimonialsProgressVal = Math.min(1, Math.max(0, (scrollY - testimonialsSlideEndVal)) / (displayDurationVal * 2.2));
      updateEl('testimonials', calculateOffset(testimonialsStart), scrollY >= testimonialsStart && scrollY < testimonialsDisplayEnd + sectionDurationVal, 40);

      // 5. SERVICES SCROLL
      const servicesScrollStart = testimonialsDisplayEnd;
      const servicesScrollSlideEndVal = servicesScrollStart + sectionDurationVal;
      const servicesScrollInternalDuration = displayDurationVal * 2;
      const servicesScrollDisplayEnd = servicesScrollSlideEndVal + servicesScrollInternalDuration;
      const servicesScrollProgressVal = Math.min(1, Math.max(0, (scrollY - servicesScrollSlideEndVal)) / servicesScrollInternalDuration);
      updateEl('services', calculateOffset(servicesScrollStart), scrollY >= servicesScrollStart && scrollY < servicesScrollDisplayEnd + sectionDurationVal, 50);

      // 6. QUOTE
      const quoteStart = servicesScrollDisplayEnd;
      const quoteSlideEndVal = quoteStart + sectionDurationVal;
      const quoteInternalDuration = displayDurationVal * 1.8;
      const quoteDisplayEnd = quoteSlideEndVal + quoteInternalDuration;
      const quoteCompleteEnd = quoteDisplayEnd + (displayDurationVal * 0.7);
      const quoteProgressVal = Math.min(1, Math.max(0, (scrollY - quoteSlideEndVal)) / quoteInternalDuration);
      updateEl('quote', calculateOffset(quoteStart), scrollY >= quoteStart && scrollY < quoteCompleteEnd + sectionDurationVal, 55);

      // 7. SERVICES SHOWCASE
      const servicesShowcaseStart = quoteCompleteEnd;
      const servicesShowcaseDisplayEnd = servicesShowcaseStart + sectionDurationVal + displayDurationVal;
      updateEl('servicesShowcase', calculateOffset(servicesShowcaseStart), scrollY >= servicesShowcaseStart && scrollY < servicesShowcaseDisplayEnd + sectionDurationVal, 60);

      // 8. FOUNDER
      const founderStart = servicesShowcaseDisplayEnd;
      const founderDisplayEnd = founderStart + sectionDurationVal + displayDurationVal;
      updateEl('founder', calculateOffset(founderStart), scrollY >= founderStart && scrollY < founderDisplayEnd + sectionDurationVal, 70);

      // 9. TEAM
      const teamStart = founderDisplayEnd;
      const teamDisplayEnd = teamStart + sectionDurationVal + displayDurationVal;
      updateEl('team', calculateOffset(teamStart), scrollY >= teamStart && scrollY < teamDisplayEnd + sectionDurationVal, 80);

      // 10. CTA
      const ctaStartVal = teamDisplayEnd;
      const ctaDisplayEnd = ctaStartVal + sectionDurationVal + displayDurationVal;
      updateEl('cta', calculateOffset(ctaStartVal), scrollY >= ctaStartVal && scrollY < ctaDisplayEnd + sectionDurationVal, 90);
      scrollTargets.current.cta = ctaStartVal;

      // 11. LATEST PROJECTS (FIXED for opacity and black background)
      const latestProjectsStartVal = ctaDisplayEnd;
      const latestProjectsSlideEndVal = latestProjectsStartVal + sectionDurationVal;
      const latestProjectsDisplayEnd = latestProjectsSlideEndVal + displayDurationVal;
      const latestProjectsOffsetVal = calculateOffset(latestProjectsStartVal);
      
      // Extended visibility buffer
      const latestProjectsVisibleVal = scrollY >= latestProjectsStartVal && scrollY < latestProjectsDisplayEnd + (sectionDurationVal * 3);
      
      const lpEl = sectionsRef.current['latestProjects'];
      if (lpEl) {
        lpEl.style.transform = `translate3d(0, ${heroHeightVal - latestProjectsOffsetVal}px, 0)`;
        lpEl.style.zIndex = '95';
        
        const opacity = scrollY >= latestProjectsStartVal ? '1' : '0';
        if (lpEl.style.opacity !== opacity) lpEl.style.opacity = opacity;
        
        const display = latestProjectsVisibleVal ? 'block' : 'none';
        if (lpEl.style.display !== display) lpEl.style.display = display;
        
        lpEl.style.pointerEvents = latestProjectsVisibleVal ? 'auto' : 'none';
      }
      scrollTargets.current.latestProjects = latestProjectsStartVal;

      // 12. FOOTER
      const footerStart = latestProjectsDisplayEnd;
      const footerOffsetVal = calculateOffset(footerStart);
      const footerVisibleVal = scrollY >= footerStart;
      updateEl('footer', footerOffsetVal, footerVisibleVal, 100);

      // --- STATE UPDATES ---
      setProgress(prev => {
        const threshold = 0.001;
        if (
          Math.abs(prev.brands - brandsProgressVal) < threshold &&
          Math.abs(prev.testimonials - testimonialsProgressVal) < threshold &&
          Math.abs(prev.services - servicesScrollProgressVal) < threshold &&
          Math.abs(prev.quote - quoteProgressVal) < threshold
        ) {
          return prev;
        }
        return {
          brands: brandsProgressVal,
          testimonials: testimonialsProgressVal,
          services: servicesScrollProgressVal,
          quote: quoteProgressVal
        };
      });

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", handleResize);
    rafId = requestAnimationFrame(loop);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [windowHeight]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.title = "OnamKulam - Interior";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const smoothScrollTo = useCallback((target: number) => {
    const startScroll = window.scrollY;
    const distance = target - startScroll;
    if (Math.abs(distance) < 10) return;
    const duration = 2500;
    let startTime: number | null = null;
    const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startScroll + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }, []);

  if (loading) return <Preloader onFinish={() => setLoading(false)} />;

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar onBeginStoryClick={() => smoothScrollTo(scrollTargets.current.cta + 640)} />
      </div>

      <main style={{ height: `${totalHeight}px` }} className="bg-black">
        
        {/* HERO */}
        <div ref={(el) => (sectionsRef.current['hero'] = el)} style={layerStyle} id='hero'>
          <Hero onExploreClick={() => smoothScrollTo(scrollTargets.current.latestProjects + 640)} />
        </div>

        {/* ACHIEVEMENTS */}
        <div ref={(el) => (sectionsRef.current['achievements'] = el)} style={layerStyle} id="achievements">
          <Achievements />
        </div>

        {/* BRANDS */}
        <div ref={(el) => (sectionsRef.current['brands'] = el)} style={layerStyle} id="brands">
          <ExclusiveBrands scrollProgress={progress.brands} />
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-black" ref={(el) => (sectionsRef.current['testimonials'] = el)} style={layerStyle} id="testimonials">
          <TestimonialScroll scrollProgress={progress.testimonials} />
        </div>

        {/* SERVICES */}
        <div className="bg-black" ref={(el) => (sectionsRef.current['services'] = el)} style={layerStyle} id="services">
          <ServicesScroll scrollProgress={progress.services} />
        </div>

        {/* QUOTE */}
        <div className="bg-white" ref={(el) => (sectionsRef.current['quote'] = el)} style={layerStyle} id="quote">
          <Quote scrollProgress={progress.quote} />
        </div>

        {/* SERVICES SHOWCASE */}
        <div className="bg-black" ref={(el) => (sectionsRef.current['servicesShowcase'] = el)} style={layerStyle} id="servicesShowcase">
          <ServicesShowcase />
        </div>

        {/* FOUNDER */}
        <div className="bg-white" ref={(el) => (sectionsRef.current['founder'] = el)} style={layerStyle} id="founder">
          <Founder />
        </div>

        {/* TEAM */}
        <div className="bg-gray-50" ref={(el) => (sectionsRef.current['team'] = el)} style={layerStyle} id="team">
          <Team />
        </div>

        {/* CTA */}
        <div ref={(el) => (sectionsRef.current['cta'] = el)} style={layerStyle} id="cta">
          <CTASection />
        </div>

        {/* LATEST PROJECTS - Fixed with White Background */}
        <div
          ref={(el) => (sectionsRef.current['latestProjects'] = el)}
          style={{
            ...layerStyle,
            transition: "opacity 0.3s ease-out",
            opacity: 0,
            pointerEvents: 'none',
            backgroundColor: 'white', // Important for black screen fix
          }}
        >
          <LatestProjects />
        </div>

        {/* FOOTER */}
        <div ref={(el) => (sectionsRef.current['footer'] = el)} style={layerStyle} id="footer">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;