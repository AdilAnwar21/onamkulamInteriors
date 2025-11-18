import { useState, useEffect, useMemo, useCallback } from "react";
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

// --- TYPES ---
interface ScrollCalculations {
  heroOffset: number;
  heroVisible: boolean;
  achievementsOffset: number;
  achievementsVisible: boolean;
  achievementsSlideEnd: number;
  brandsOffset: number;
  brandsVisible: boolean;
  brandsSlideEnd: number;
  brandsProgress: number;
  testimonialsOffset: number;
  testimonialsVisible: boolean;
  testimonialsSlideEnd: number;
  testimonialsProgress: number;
  servicesScrollOffset: number;
  servicesScrollVisible: boolean;
  servicesScrollSlideEnd: number;
  servicesScrollProgress: number;
  quoteOffset: number;
  quoteVisible: boolean;
  quoteSlideEnd: number;
  quoteProgress: number;
  servicesShowcaseOffset: number;
  servicesShowcaseVisible: boolean;
  servicesShowcaseSlideEnd: number;
  founderOffset: number;
  founderVisible: boolean;
  founderSlideEnd: number;
  teamOffset: number;
  teamVisible: boolean;
  teamSlideEnd: number;
  ctaOffset: number;
  ctaVisible: boolean;
  ctaSlideEnd: number;
  ctaStart: number;
  latestProjectsOffset: number;
  latestProjectsVisible: boolean;
  latestProjectsSlideEnd: number;
  latestProjectsStart: number;
  footerOffset: number;
  footerVisible: boolean;
  totalHeight: number;
  heroHeight: number;
  sectionDuration: number;
  displayDuration: number;
}

// --- STYLES ---
// Hardware acceleration styles to prevent mobile lag
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
};

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  // --- SCROLL LOOP ---
  // Throttled using requestAnimationFrame for 60fps performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      window.requestAnimationFrame(() => {
        setWindowHeight(window.innerHeight);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.title = "OnamKulam - Interior";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // --- CALCULATIONS ---
  const {
    heroOffset, heroVisible,
    achievementsOffset, achievementsVisible, achievementsSlideEnd,
    brandsOffset, brandsVisible, brandsSlideEnd, brandsProgress,
    testimonialsOffset, testimonialsVisible, testimonialsSlideEnd, testimonialsProgress,
    servicesScrollOffset, servicesScrollVisible, servicesScrollSlideEnd, servicesScrollProgress,
    quoteOffset, quoteVisible, quoteSlideEnd, quoteProgress,
    servicesShowcaseOffset, servicesShowcaseVisible, servicesShowcaseSlideEnd,
    founderOffset, founderVisible, founderSlideEnd,
    teamOffset, teamVisible, teamSlideEnd,
    ctaOffset, ctaVisible, ctaSlideEnd, ctaStart,
    latestProjectsOffset, latestProjectsVisible, latestProjectsSlideEnd, latestProjectsStart,
    footerOffset, footerVisible,
    totalHeight, heroHeight,
    sectionDuration, displayDuration
  } = useMemo<ScrollCalculations>(() => {
    const heroHeightVal = Math.min(windowHeight, 800);
    const sectionDurationVal = heroHeightVal; // Fixed: Duration equals height for 1:1 scroll
    const displayDurationVal = heroHeightVal * 0.8;

    const heroEnd = heroHeightVal * 0.9;
    const heroOffsetVal = Math.min(scrollY * 0.4, heroHeightVal * 0.4);
    const heroVisibleVal = scrollY < heroEnd + sectionDurationVal;

    // Helper: Calculates strictly clamped offset (0 to heroHeight)
    const calculateOffset = (start: number) => {
      const relativeScroll = scrollY - start;
      return Math.min(heroHeightVal, Math.max(0, relativeScroll));
    };

    const achievementsStart = heroHeightVal * 0.5;
    const achievementsSlideEndVal = achievementsStart + sectionDurationVal;
    const achievementsDisplayEnd = achievementsSlideEndVal + displayDurationVal;
    const achievementsOffsetVal = calculateOffset(achievementsStart);
    const achievementsVisibleVal = scrollY >= achievementsStart && scrollY < achievementsDisplayEnd + sectionDurationVal;

    const brandsStart = achievementsDisplayEnd;
    const brandsSlideEndVal = brandsStart + sectionDurationVal;
    const brandsInternalScrollDuration = displayDurationVal * 8; 
    const brandsDisplayEnd = brandsSlideEndVal + brandsInternalScrollDuration;
    const brandsOffsetVal = calculateOffset(brandsStart);
    
    const rawBrandsProgress = Math.max(0, scrollY - brandsSlideEndVal) / brandsInternalScrollDuration;
    const brandsProgressVal = Math.min(1, rawBrandsProgress);
    const brandsVisibleVal = scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDurationVal;

    const testimonialsStart = brandsDisplayEnd;
    const testimonialsSlideEndVal = testimonialsStart + sectionDurationVal;
    const testimonialsDisplayEnd = testimonialsSlideEndVal + displayDurationVal * 2.2;
    const testimonialsOffsetVal = calculateOffset(testimonialsStart);
    const testimonialsProgressVal = Math.min(1, Math.max(0, (scrollY - testimonialsSlideEndVal)) / (displayDurationVal * 2.2));
    const testimonialsVisibleVal = scrollY >= testimonialsStart && scrollY < testimonialsDisplayEnd + sectionDurationVal;

    const servicesScrollStart = testimonialsDisplayEnd;
    const servicesScrollSlideEndVal = servicesScrollStart + sectionDurationVal;
    const servicesScrollInternalDuration = displayDurationVal * 2;
    const servicesScrollDisplayEnd = servicesScrollSlideEndVal + servicesScrollInternalDuration;
    const servicesScrollProgressVal = Math.min(1, Math.max(0, (scrollY - servicesScrollSlideEndVal)) / servicesScrollInternalDuration);
    const servicesScrollVisibleVal = scrollY >= servicesScrollStart && scrollY < servicesScrollDisplayEnd + sectionDurationVal;
    const servicesScrollOffsetVal = calculateOffset(servicesScrollStart);

    const quoteStart = servicesScrollDisplayEnd;
    const quoteSlideEndVal = quoteStart + sectionDurationVal;
    const quoteInternalDuration = displayDurationVal * 1.8;
    const quoteDisplayEnd = quoteSlideEndVal + quoteInternalDuration;
    const quoteHoldDuration = displayDurationVal * 0.7;
    const quoteCompleteEnd = quoteDisplayEnd + quoteHoldDuration;
    const quoteOffsetVal = calculateOffset(quoteStart);
    const quoteProgressVal = Math.min(1, Math.max(0, (scrollY - quoteSlideEndVal)) / quoteInternalDuration);
    const quoteVisibleVal = scrollY >= quoteStart && scrollY < quoteCompleteEnd + sectionDurationVal;

    const servicesShowcaseStart = quoteCompleteEnd;
    const servicesShowcaseSlideEndVal = servicesShowcaseStart + sectionDurationVal;
    const servicesShowcaseDisplayEnd = servicesShowcaseSlideEndVal + displayDurationVal;
    const servicesShowcaseOffsetVal = calculateOffset(servicesShowcaseStart);
    const servicesShowcaseVisibleVal = scrollY >= servicesShowcaseStart && scrollY < servicesShowcaseDisplayEnd + sectionDurationVal;

    const founderStart = servicesShowcaseDisplayEnd;
    const founderSlideEndVal = founderStart + sectionDurationVal;
    const founderDisplayEnd = founderSlideEndVal + displayDurationVal;
    const founderOffsetVal = calculateOffset(founderStart);
    const founderVisibleVal = scrollY >= founderStart && scrollY < founderDisplayEnd + sectionDurationVal;

    const teamStart = founderDisplayEnd;
    const teamSlideEndVal = teamStart + sectionDurationVal;
    const teamDisplayEnd = teamSlideEndVal + displayDurationVal;
    const teamOffsetVal = calculateOffset(teamStart);
    const teamVisibleVal = scrollY >= teamStart && scrollY < teamDisplayEnd + sectionDurationVal;

    const ctaStartVal = teamDisplayEnd;
    const ctaSlideEndVal = ctaStartVal + sectionDurationVal;
    const ctaDisplayEnd = ctaSlideEndVal + displayDurationVal;
    const ctaOffsetVal = calculateOffset(ctaStartVal);
    const ctaVisibleVal = scrollY >= ctaStartVal && scrollY < ctaDisplayEnd + sectionDurationVal;

    const latestProjectsStartVal = ctaDisplayEnd;
    const latestProjectsSlideEndVal = latestProjectsStartVal + sectionDurationVal;
    const latestProjectsDisplayEnd = latestProjectsSlideEndVal + displayDurationVal;
    const latestProjectsOffsetVal = calculateOffset(latestProjectsStartVal);
    const latestProjectsVisibleVal = scrollY >= latestProjectsStartVal && scrollY < latestProjectsDisplayEnd + sectionDurationVal;

    const footerStart = latestProjectsDisplayEnd;
    const footerOffsetVal = calculateOffset(footerStart);
    const footerVisibleVal = scrollY >= footerStart;

    const totalHeightVal = footerStart + heroHeightVal * 2;

    return {
      heroOffset: heroOffsetVal, heroVisible: heroVisibleVal,
      achievementsOffset: achievementsOffsetVal, achievementsVisible: achievementsVisibleVal, achievementsSlideEnd: achievementsSlideEndVal,
      brandsOffset: brandsOffsetVal, brandsVisible: brandsVisibleVal, brandsSlideEnd: brandsSlideEndVal, brandsProgress: brandsProgressVal,
      testimonialsOffset: testimonialsOffsetVal, testimonialsVisible: testimonialsVisibleVal, testimonialsSlideEnd: testimonialsSlideEndVal, testimonialsProgress: testimonialsProgressVal,
      servicesScrollOffset: servicesScrollOffsetVal, servicesScrollVisible: servicesScrollVisibleVal, servicesScrollSlideEnd: servicesScrollSlideEndVal, servicesScrollProgress: servicesScrollProgressVal,
      quoteOffset: quoteOffsetVal, quoteVisible: quoteVisibleVal, quoteSlideEnd: quoteSlideEndVal, quoteProgress: quoteProgressVal,
      servicesShowcaseOffset: servicesShowcaseOffsetVal, servicesShowcaseVisible: servicesShowcaseVisibleVal, servicesShowcaseSlideEnd: servicesShowcaseSlideEndVal,
      founderOffset: founderOffsetVal, founderVisible: founderVisibleVal, founderSlideEnd: founderSlideEndVal,
      teamOffset: teamOffsetVal, teamVisible: teamVisibleVal, teamSlideEnd: teamSlideEndVal,
      ctaOffset: ctaOffsetVal, ctaVisible: ctaVisibleVal, ctaSlideEnd: ctaSlideEndVal, ctaStart: ctaStartVal,
      latestProjectsOffset: latestProjectsOffsetVal, latestProjectsVisible: latestProjectsVisibleVal, latestProjectsSlideEnd: latestProjectsSlideEndVal, latestProjectsStart: latestProjectsStartVal,
      footerOffset: footerOffsetVal, footerVisible: footerVisibleVal,
      totalHeight: totalHeightVal, heroHeight: heroHeightVal,
      sectionDuration: sectionDurationVal, displayDuration: displayDurationVal
    };
  }, [scrollY, windowHeight]);

  const smoothScrollTo = useCallback((target: number) => {
      const startScroll = window.scrollY;
      const distance = target - startScroll;
      if (Math.abs(distance) < 10) return;

      const duration = 2500;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        const currentPosition = startScroll + distance * easedProgress;

        window.scrollTo(0, currentPosition);
        if (progress < 1) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
  }, []);

  const scrollToLatestProjects = useCallback(() => {
    const targetScroll = latestProjectsStart + sectionDuration + displayDuration * 0.3;
    smoothScrollTo(targetScroll);
  }, [latestProjectsStart, sectionDuration, displayDuration, smoothScrollTo]);

  const scrollToCTA = useCallback(() => {
    const targetScroll = ctaStart + sectionDuration + displayDuration * 0.3;
    smoothScrollTo(targetScroll);
  }, [ctaStart, sectionDuration, displayDuration, smoothScrollTo]);

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar onBeginStoryClick={scrollToCTA} />
      </div>

      <main style={{ height: `${totalHeight}px` }} className="bg-black">
        
        <div
          style={{
            ...layerStyle,
            zIndex: 10,
            transform: `translate3d(0, ${-heroOffset}px, 0)`,
            display: heroVisible ? 'block' : 'none'
          }}
          id='hero'
        >
          <Hero onExploreClick={scrollToLatestProjects} />
        </div>

        <div
          style={{
            ...layerStyle,
            zIndex: 20,
            transform: `translate3d(0, ${heroHeight - achievementsOffset}px, 0)`,
            display: achievementsVisible ? 'block' : 'none'
          }}
          id = "achievements"
        >
          <Achievements />
        </div>

        <div
          style={{
            ...layerStyle,
            zIndex: 30,
            transform: `translate3d(0, ${heroHeight - brandsOffset}px, 0)`,
            display: brandsVisible ? 'block' : 'none'
          }}
          id = "brands"
        >
          <ExclusiveBrands scrollProgress={brandsProgress} />
        </div>

        <div
          className="bg-black"
          style={{
            ...layerStyle,
            zIndex: 40,
            transform: `translate3d(0, ${heroHeight - testimonialsOffset}px, 0)`,
            display: testimonialsVisible ? 'block' : 'none'
          }}
          id = "testimonials"
        >
          <TestimonialScroll scrollProgress={testimonialsProgress} />
        </div>

        <div
          className="bg-black"
          style={{
            ...layerStyle,
            zIndex: 50,
            transform: `translate3d(0, ${heroHeight - servicesScrollOffset}px, 0)`,
            display: servicesScrollVisible ? 'block' : 'none'
          }}
          id = "services"
        >
          <ServicesScroll scrollProgress={servicesScrollProgress} />
        </div>

        <div
          className="bg-white"
          style={{
            ...layerStyle,
            zIndex: 55,
            transform: `translate3d(0, ${heroHeight - quoteOffset}px, 0)`,
            display: quoteVisible ? 'block' : 'none'
          }}
          id = "quote"
        >
          <Quote scrollProgress={quoteProgress} />
        </div>

        <div
          className="bg-black"
          style={{
            ...layerStyle,
            zIndex: 60,
            transform: `translate3d(0, ${heroHeight - servicesShowcaseOffset}px, 0)`,
            display: servicesShowcaseVisible ? 'block' : 'none'
          }}
          id = "servicesShowcase"
        >
          <ServicesShowcase />
        </div>

        <div
          className="bg-white"
          style={{
            ...layerStyle,
            zIndex: 70,
            transform: `translate3d(0, ${heroHeight - founderOffset}px, 0)`,
            display: founderVisible ? 'block' : 'none'
          }}
          id = "founder"
        >
          <Founder />
        </div>

        <div
          className="bg-gray-50"
          style={{
            ...layerStyle,
            zIndex: 80,
            transform: `translate3d(0, ${heroHeight - teamOffset}px, 0)`,
            display: teamVisible ? 'block' : 'none'
          }}
          id = "team"
        >
          <Team />
        </div>

        <div
          style={{
            ...layerStyle,
            zIndex: 90,
            transform: `translate3d(0, ${heroHeight - ctaOffset}px, 0)`,
            display: ctaVisible ? 'block' : 'none'
          }}
          id = "cta"
        >
          <CTASection />
        </div>

        <div
          style={{
            ...layerStyle,
            zIndex: 95,
            transform: `translate3d(0, ${heroHeight - latestProjectsOffset}px, 0)`,
            transition: "opacity 0.3s ease-out",
            opacity: scrollY >= latestProjectsStart ? 1 : 0,
            pointerEvents: latestProjectsVisible ? 'auto' : 'none'
          }}
        >
          <LatestProjects />
        </div>

        <div
          style={{
            ...layerStyle,
            zIndex: 100,
            transform: `translate3d(0, ${heroHeight - footerOffset}px, 0)`,
            display: footerVisible ? 'block' : 'none'
          }}
          id = "footer"
        >
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;