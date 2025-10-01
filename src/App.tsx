import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// --- Preloader Component ---
// const Preloader = ({ onFinish }: { onFinish: () => void }) => {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(false);
//       setTimeout(onFinish, 800);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
//           initial={{ scale: 1, opacity: 1 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 50, opacity: 0, transition: { duration: 0.8 } }}
//         >
//           <motion.h1
//             className="text-4xl font-bold tracking-widest"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
//           >
//             ONAMKULAM
//           </motion.h1>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("scroll", handleScroll);
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

  const heroHeight = Math.min(windowHeight, 800);
  // Balanced timing for smooth stacking with moderate speed
  const sectionDuration = heroHeight * 0.65; // Smoother slide-in transitions
  const displayDuration = heroHeight * 0.8; // Comfortable viewing time

  // --- Section scroll math ---
  const heroEnd = heroHeight * 0.9;
  const heroOffset = Math.min(scrollY * 0.4, heroHeight * 0.4);
  const heroVisible = scrollY < heroEnd + sectionDuration * 0.8;

  const achievementsStart = heroHeight * 0.5;
  const achievementsSlideEnd = achievementsStart + sectionDuration;
  const achievementsDisplayEnd = achievementsSlideEnd + displayDuration;
  const achievementsScroll = Math.max(0, scrollY - achievementsStart);
  const achievementsOffset = Math.min(heroHeight, achievementsScroll);
  const achievementsVisible =
    scrollY >= achievementsStart &&
    scrollY < achievementsDisplayEnd + sectionDuration;

  const brandsStart = achievementsDisplayEnd;
  const brandsSlideEnd = brandsStart + sectionDuration * 0.8;
  // Smooth brands scroll with good visibility
  const brandsInternalScrollDuration = displayDuration * 8; // Balanced speed
  const brandsDisplayEnd = brandsSlideEnd + brandsInternalScrollDuration;
  const brandsScroll = Math.max(0, scrollY - brandsStart);
  const brandsOffset = Math.min(heroHeight, brandsScroll);
  const rawBrandsProgress =
    Math.max(0, scrollY - brandsSlideEnd) / brandsInternalScrollDuration;
  const brandsProgress = Math.min(1, rawBrandsProgress);
  const brandsVisible =
    scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDuration;

  const testimonialsStart = brandsDisplayEnd;
  const testimonialsSlideEnd = testimonialsStart + sectionDuration;
  // Smooth testimonials with better readability
  const testimonialsDisplayEnd = testimonialsSlideEnd + displayDuration * 2.2; // Good reading pace
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsOffset = Math.min(heroHeight, testimonialsScroll);
  const testimonialsProgress = Math.min(
    1,
    Math.max(0, (scrollY - testimonialsSlideEnd)) / (displayDuration * 2.2)
  );
  const testimonialsVisible =
    scrollY >= testimonialsStart &&
    scrollY < testimonialsDisplayEnd + sectionDuration;

  const servicesScrollStart = testimonialsDisplayEnd;
  const servicesScrollSlideEnd = servicesScrollStart + sectionDuration;
  // Balanced services scroll speed
  const servicesScrollInternalDuration = displayDuration * 2; // Smooth viewing
  const servicesScrollDisplayEnd =
    servicesScrollSlideEnd + servicesScrollInternalDuration;
  const servicesScrollProgress = Math.min(
    1,
    Math.max(0, (scrollY - servicesScrollSlideEnd)) /
      servicesScrollInternalDuration
  );
  const servicesScrollVisible =
    scrollY >= servicesScrollStart &&
    scrollY < servicesScrollDisplayEnd + sectionDuration * 0.5;
  const servicesScrollOffset = Math.min(
    heroHeight,
    Math.max(0, scrollY - servicesScrollStart)
  );

  const quoteStart = servicesScrollDisplayEnd - sectionDuration * 0.5;
  const quoteSlideEnd = quoteStart + sectionDuration;
  // Smooth quote reveal with comfortable reading time
  const quoteInternalDuration = displayDuration * 1.8; // Better pacing
  const quoteDisplayEnd = quoteSlideEnd + quoteInternalDuration;
  const quoteHoldDuration = displayDuration * 0.7; // Longer hold for impact
  const quoteCompleteEnd = quoteDisplayEnd + quoteHoldDuration;
  const quoteScroll = Math.max(0, scrollY - quoteStart);
  const quoteOffset = Math.min(heroHeight, quoteScroll);
  const quoteProgress = Math.min(
    1,
    Math.max(0, (scrollY - quoteSlideEnd)) / quoteInternalDuration
  );
  const quoteVisible =
    scrollY >= quoteStart && scrollY < quoteCompleteEnd + sectionDuration;

  const servicesShowcaseStart = quoteCompleteEnd;
  const servicesShowcaseSlideEnd = servicesShowcaseStart + sectionDuration;
  const servicesShowcaseDisplayEnd =
    servicesShowcaseSlideEnd + displayDuration;
  const servicesShowcaseScroll = Math.max(0, scrollY - servicesShowcaseStart);
  const servicesShowcaseOffset = Math.min(heroHeight, servicesShowcaseScroll);
  const servicesShowcaseVisible =
    scrollY >= servicesShowcaseStart &&
    scrollY < servicesShowcaseDisplayEnd + sectionDuration;

  const founderStart = servicesShowcaseDisplayEnd;
  const founderSlideEnd = founderStart + sectionDuration;
  const founderDisplayEnd = founderSlideEnd + displayDuration;
  const founderScroll = Math.max(0, scrollY - founderStart);
  const founderOffset = Math.min(heroHeight, founderScroll);
  const founderVisible =
    scrollY >= founderStart && scrollY < founderDisplayEnd + sectionDuration;

  const teamStart = founderDisplayEnd;
  const teamSlideEnd = teamStart + sectionDuration;
  const teamDisplayEnd = teamSlideEnd + displayDuration;
  const teamScroll = Math.max(0, scrollY - teamStart);
  const teamOffset = Math.min(heroHeight, teamScroll);
  const teamVisible =
    scrollY >= teamStart && scrollY < teamDisplayEnd + sectionDuration;

  const ctaStart = teamDisplayEnd;
  const ctaSlideEnd = ctaStart + sectionDuration;
  const ctaDisplayEnd = ctaSlideEnd + displayDuration;
  const ctaScroll = Math.max(0, scrollY - ctaStart);
  const ctaOffset = Math.min(heroHeight, ctaScroll);
  const ctaVisible =
    scrollY >= ctaStart && scrollY < ctaDisplayEnd + sectionDuration;

  const latestProjectsStart = ctaDisplayEnd;
  const latestProjectsSlideEnd = latestProjectsStart + sectionDuration;
  const latestProjectsDisplayEnd = latestProjectsSlideEnd + displayDuration;
  const latestProjectsScroll = Math.max(0, scrollY - latestProjectsStart);
  const latestProjectsOffset = Math.min(heroHeight, latestProjectsScroll);
  const latestProjectsVisible =
    scrollY >= latestProjectsStart &&
    scrollY < latestProjectsDisplayEnd + sectionDuration;

  const footerStart = latestProjectsDisplayEnd;
  const footerScroll = Math.max(0, scrollY - footerStart);
  const footerOffset = Math.min(heroHeight, footerScroll);
  const footerVisible = scrollY >= footerStart;

  const totalHeight = footerStart + heroHeight * 2;

  // --- Navigation Functions ---
  const scrollToLatestProjects = () => {
    // Scroll to fully display Latest Projects section at the top
    const targetScroll = latestProjectsStart + sectionDuration + displayDuration * 0.3;
    const startScroll = window.scrollY;
    const distance = targetScroll - startScroll;
    
    if (Math.abs(distance) < 10) return; // Already there
    
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

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToCTA = () => {
    // Scroll to fully display CTA section at the top
    const targetScroll = ctaStart + sectionDuration + displayDuration * 0.3;
    const startScroll = window.scrollY;
    const distance = targetScroll - startScroll;
    
    if (Math.abs(distance) < 10) return; // Already there or past it

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

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar onBeginStoryClick={scrollToCTA} />
      </div>

      <main style={{ height: `${totalHeight}px` }} className="bg-black">
        {heroVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 10,
              transform: `translateY(${-heroOffset}px)`,
            }}
            id='hero'
          >
            <Hero onExploreClick={scrollToLatestProjects} />
          </div>
        )}

        {achievementsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 20,
              transform:
                scrollY <= achievementsSlideEnd
                  ? `translateY(${heroHeight - achievementsOffset}px)`
                  : "translateY(0px)",
            }}
            id = "achievements"
          >
            <Achievements />
          </div>
        )}

        {brandsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 30,
              transform:
                scrollY <= brandsSlideEnd
                  ? `translateY(${heroHeight - brandsOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.05s linear",
            }}
            id = "brands"
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {testimonialsVisible && (
          <div
            className="fixed inset-0 w-full bg-black"
            style={{
              zIndex: 40,
              transform:
                scrollY <= testimonialsSlideEnd
                  ? `translateY(${heroHeight - testimonialsOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.08s ease-out",
            }}
            id = "testimonials"
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {servicesScrollVisible && (
          <div
            className="fixed inset-0 w-full bg-black"
            style={{
              zIndex: 50,
              transform:
                scrollY <= servicesScrollSlideEnd
                  ? `translateY(${heroHeight - servicesScrollOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.08s ease-out",
            }}
            id = "services"
          >
            <ServicesScroll scrollProgress={servicesScrollProgress} />
          </div>
        )}

        {quoteVisible && (
          <div
            className="fixed inset-0 w-full bg-white"
            style={{
              zIndex: 55,
              transform:
                scrollY <= quoteSlideEnd
                  ? `translateY(${heroHeight - quoteOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.08s ease-out",
            }}
            id = "quote"
          >
            <Quote scrollProgress={quoteProgress} />
          </div>
        )}

        {servicesShowcaseVisible && (
          <div
            className="fixed inset-0 w-full bg-black"
            style={{
              zIndex: 60,
              transform:
                scrollY <= servicesShowcaseSlideEnd
                  ? `translateY(${heroHeight - servicesShowcaseOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.1s ease-out",
            }}
            id = "servicesShowcase"
          >
            <ServicesShowcase />
          </div>
        )}

        {founderVisible && (
          <div
            className="fixed inset-0 w-full bg-white"
            style={{
              zIndex: 70,
              transform:
                scrollY <= founderSlideEnd
                  ? `translateY(${heroHeight - founderOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.1s ease-out",
            }}
            id = "founder"
          >
            <Founder />
          </div>
        )}

        {teamVisible && (
          <div
            className="fixed inset-0 w-full bg-gray-50"
            style={{
              zIndex: 80,
              transform:
                scrollY <= teamSlideEnd
                  ? `translateY(${heroHeight - teamOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.1s ease-out",
            }}
            id = "team"
          >
            <Team />
          </div>
        )}

        {ctaVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 90,
              transform:
                scrollY <= ctaSlideEnd
                  ? `translateY(${heroHeight - ctaOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.1s ease-out",
            }}
            id = "cta"
          >
            <CTASection />
          </div>
        )}

        {latestProjectsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 95,
              transform:
                scrollY <= latestProjectsSlideEnd
                  ? `translateY(${heroHeight - latestProjectsOffset}px)`
                  : "translateY(0px)",
              transition: "transform 0.1s ease-out",
              opacity: scrollY >= latestProjectsStart ? 1 : 0,
            }}
          >
            <LatestProjects />
          </div>
        )}

        {footerVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 100,
              transform: `translateY(${heroHeight - footerOffset}px)`,
              transition: "transform 0.1s ease-out",
            }}
            id = "footer"
          >
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;