"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useMotionValue } from "framer-motion";
import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import FloatingNavbar from "../components/FloatingNavbar";
import Achievements from "../components/Achievements";
import ExclusiveBrands from "../components/partnersSection";
import TestimonialScroll from "../components/Testimonials";
import ServicesScroll from "../components/Services";
import Quote from "../components/Quote";
import ServicesShowcase from "../components/ServicesShowcase";
import Founder from "../components/Founder";
import Team from "../components/Team";
import CTASection from "../components/CTASection";
import LatestProjects from "../components/LatestProjects";
import Footer from "../components/Footer";

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

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    // --- NAV STATE ---
    const [activeSection, setActiveSection] = useState('Home');
    const activeSectionRef = useRef('Home'); // Ref to access in loop without re-triggering effect

    // --- REFS ---
    const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
    // Add new keys for nav targets
    const scrollTargets = useRef<{ [key: string]: number }>({
        cta: 0,
        latestProjects: 0,
        home: 0,
        about: 0,
        projects: 0,
        contact: 0
    });

    // --- MOTION VALUES ---
    const achievementsProgress = useMotionValue(0);
    const brandsProgress = useMotionValue(0);
    const testimonialsProgress = useMotionValue(0);
    const servicesProgress = useMotionValue(0);
    const quoteProgress = useMotionValue(0);

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
        let lastWidth = window.innerWidth;

        const handleResize = () => {
            // FIX: Only update if width changes (orientation change) or height changes significantly (>150px)
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            if (newWidth !== lastWidth || Math.abs(newHeight - windowHeight) > 150) {
                lastWidth = newWidth;
                setWindowHeight(newHeight);
            }
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
            scrollTargets.current.home = 0;

            // 2. ACHIEVEMENTS
            const achievementsStart = heroHeightVal * 0.5;
            const achievementsSlideEnd = achievementsStart + sectionDurationVal;
            const achievementsDisplayEnd = achievementsSlideEnd + displayDurationVal;

            const rawAchievementsProgress = Math.max(0, scrollY - achievementsSlideEnd) / displayDurationVal;
            achievementsProgress.set(Math.min(1, rawAchievementsProgress));

            updateEl('achievements', calculateOffset(achievementsStart), scrollY >= achievementsStart && scrollY < achievementsDisplayEnd + sectionDurationVal, 20);

            // 3. BRANDS
            const brandsStart = achievementsDisplayEnd;
            const brandsSlideEndVal = brandsStart + sectionDurationVal;
            const brandsInternalScrollDuration = displayDurationVal * 8;
            const brandsDisplayEnd = brandsSlideEndVal + brandsInternalScrollDuration;
            const rawBrandsProgress = Math.max(0, scrollY - brandsSlideEndVal) / brandsInternalScrollDuration;
            brandsProgress.set(Math.min(1, rawBrandsProgress));
            updateEl('brands', calculateOffset(brandsStart), scrollY >= brandsStart && scrollY < brandsDisplayEnd + sectionDurationVal, 30);

            // 4. TESTIMONIALS
            const testimonialsStart = brandsDisplayEnd;
            const testimonialsSlideEndVal = testimonialsStart + sectionDurationVal;
            const testimonialsDisplayEnd = testimonialsSlideEndVal + displayDurationVal * 2.2;
            const rawTestimonialsProgress = Math.min(1, Math.max(0, (scrollY - testimonialsSlideEndVal)) / (displayDurationVal * 2.2));
            testimonialsProgress.set(rawTestimonialsProgress);
            updateEl('testimonials', calculateOffset(testimonialsStart), scrollY >= testimonialsStart && scrollY < testimonialsDisplayEnd + sectionDurationVal, 40);

            // 5. SERVICES SCROLL
            const servicesScrollStart = testimonialsDisplayEnd;
            const servicesScrollSlideEndVal = servicesScrollStart + sectionDurationVal;
            const servicesScrollInternalDuration = displayDurationVal * 2;
            const servicesScrollDisplayEnd = servicesScrollSlideEndVal + servicesScrollInternalDuration;
            const rawServicesProgress = Math.min(1, Math.max(0, (scrollY - servicesScrollSlideEndVal)) / servicesScrollInternalDuration);
            servicesProgress.set(rawServicesProgress);
            updateEl('services', calculateOffset(servicesScrollStart), scrollY >= servicesScrollStart && scrollY < servicesScrollDisplayEnd + sectionDurationVal, 50);

            // 6. QUOTE
            const quoteStart = servicesScrollDisplayEnd;
            const quoteSlideEndVal = quoteStart + sectionDurationVal;
            const quoteInternalDuration = displayDurationVal * 1.8;
            const quoteDisplayEnd = quoteSlideEndVal + quoteInternalDuration;
            const quoteCompleteEnd = quoteDisplayEnd + (displayDurationVal * 0.7);
            const rawQuoteProgress = Math.min(1, Math.max(0, (scrollY - quoteSlideEndVal)) / quoteInternalDuration);
            quoteProgress.set(rawQuoteProgress);
            updateEl('quote', calculateOffset(quoteStart), scrollY >= quoteStart && scrollY < quoteCompleteEnd + sectionDurationVal, 55);

            // 7. SERVICES SHOWCASE
            const servicesShowcaseStart = quoteCompleteEnd;
            const servicesShowcaseDisplayEnd = servicesShowcaseStart + sectionDurationVal + displayDurationVal;
            updateEl('servicesShowcase', calculateOffset(servicesShowcaseStart), scrollY >= servicesShowcaseStart && scrollY < servicesShowcaseDisplayEnd + sectionDurationVal, 60);

            // 8. FOUNDER (Start of ABOUT)
            const founderStart = servicesShowcaseDisplayEnd;
            const founderDisplayEnd = founderStart + sectionDurationVal + displayDurationVal;
            updateEl('founder', calculateOffset(founderStart), scrollY >= founderStart && scrollY < founderDisplayEnd + sectionDurationVal, 70);
            scrollTargets.current.about = founderStart;

            // 9. TEAM
            const teamStart = founderDisplayEnd;
            const teamDisplayEnd = teamStart + sectionDurationVal + displayDurationVal;
            updateEl('team', calculateOffset(teamStart), scrollY >= teamStart && scrollY < teamDisplayEnd + sectionDurationVal, 80);

            // 10. CTA (Start of CONTACT)
            const ctaStartVal = teamDisplayEnd;
            const ctaDisplayEnd = ctaStartVal + sectionDurationVal + displayDurationVal;
            updateEl('cta', calculateOffset(ctaStartVal), scrollY >= ctaStartVal && scrollY < ctaDisplayEnd + sectionDurationVal, 90);
            scrollTargets.current.cta = ctaStartVal;
            scrollTargets.current.contact = ctaStartVal;

            // 11. LATEST PROJECTS (Start of PROJECTS)
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
            scrollTargets.current.projects = latestProjectsStartVal;

            // 12. FOOTER
            const footerStart = latestProjectsDisplayEnd;
            const footerOffsetVal = calculateOffset(footerStart);
            const footerVisibleVal = scrollY >= footerStart;
            updateEl('footer', footerOffsetVal, footerVisibleVal, 100);

            // --- CALCULATE ACTIVE SECTION ---
            // Determine which section is currently active for Navbar
            let currentSection = 'Home';
            if (scrollY >= founderStart && scrollY < ctaStartVal) {
                currentSection = 'About';
            } else if (scrollY >= ctaStartVal && scrollY < latestProjectsStartVal) {
                currentSection = 'Contact';
            } else if (scrollY >= latestProjectsStartVal) {
                currentSection = 'Projects';
            }
            // Default remains 'Home' for everything before Founder

            // Check if changed before updating state to avoid re-renders
            if (currentSection !== activeSectionRef.current) {
                activeSectionRef.current = currentSection;
                setActiveSection(currentSection);
            }

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
        // Add offset for sticky headers if any, or just scroll to target.
        // Since sections are stacking cards, scrolling to 'target' usually reveals the TOP of the card.
        // However, cards stick. So scrolling to 'start' value puts that card at the top.
        const startScroll = window.scrollY;
        // Small offset to ensure it triggers the sticking
        const distance = (target + 5) - startScroll;

        if (Math.abs(distance) < 10) return;
        const duration = 2000; // Slightly faster than 2500
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

    const handleNavClick = useCallback((section: string) => {
        const key = section.toLowerCase();
        const target = scrollTargets.current[key];
        if (typeof target === 'number') {
            smoothScrollTo(target);
        }
    }, [smoothScrollTo]);

    return (
        <>
            {loading && <Preloader onFinish={() => setLoading(false)} />}
            <div className="relative overflow-hidden bg-black">
                <div className="fixed inset-x-0 top-0 z-[100]">
                    <FloatingNavbar
                        activeSection={activeSection}
                        onBeginStoryClick={() => smoothScrollTo(scrollTargets.current.cta + 50)}
                        onNavClick={handleNavClick}
                    />
                </div>

                <main style={{ height: `${totalHeight}px` }} className="bg-black">

                    {/* HERO */}
                    <div ref={(el) => { sectionsRef.current['hero'] = el; }} style={layerStyle} id='hero'>
                        <Hero onExploreClick={() => smoothScrollTo(scrollTargets.current.latestProjects + 50)} />
                    </div>

                    {/* ACHIEVEMENTS */}
                    <div ref={(el) => { sectionsRef.current['achievements'] = el; }} style={layerStyle} id="achievements">
                        <Achievements scrollProgress={achievementsProgress} />
                    </div>

                    {/* BRANDS */}
                    <div ref={(el) => { sectionsRef.current['brands'] = el; }} style={layerStyle} id="brands">
                        <ExclusiveBrands scrollProgress={brandsProgress} />
                    </div>

                    {/* TESTIMONIALS */}
                    <div className="bg-black" ref={(el) => { sectionsRef.current['testimonials'] = el; }} style={layerStyle} id="testimonials">
                        <TestimonialScroll scrollProgress={testimonialsProgress} />
                    </div>

                    {/* SERVICES */}
                    <div className="bg-black" ref={(el) => { sectionsRef.current['services'] = el; }} style={layerStyle} id="services">
                        <ServicesScroll scrollProgress={servicesProgress} />
                    </div>

                    {/* QUOTE */}
                    <div className="bg-white" ref={(el) => { sectionsRef.current['quote'] = el; }} style={layerStyle} id="quote">
                        <Quote scrollProgress={quoteProgress} />
                    </div>

                    {/* SERVICES SHOWCASE */}
                    <div className="bg-black" ref={(el) => { sectionsRef.current['servicesShowcase'] = el; }} style={layerStyle} id="servicesShowcase">
                        <ServicesShowcase />
                    </div>

                    {/* FOUNDER */}
                    <div className="bg-white" ref={(el) => { sectionsRef.current['founder'] = el; }} style={layerStyle} id="founder">
                        <Founder />
                    </div>

                    {/* TEAM */}
                    <div className="bg-gray-50" ref={(el) => { sectionsRef.current['team'] = el; }} style={layerStyle} id="team">
                        <Team />
                    </div>

                    {/* CTA */}
                    <div ref={(el) => { sectionsRef.current['cta'] = el; }} style={layerStyle} id="cta">
                        <CTASection />
                    </div>

                    {/* LATEST PROJECTS - Fixed with White Background */}
                    <div
                        ref={(el) => { sectionsRef.current['latestProjects'] = el; }}
                        style={{
                            ...layerStyle,
                            transition: "opacity 0.3s ease-out",
                            opacity: 0,
                            pointerEvents: 'none',
                            backgroundColor: 'white',
                        }}
                    >
                        <LatestProjects />
                    </div>

                    {/* FOOTER */}
                    <div ref={(el) => { sectionsRef.current['footer'] = el; }} style={layerStyle} id="footer">
                        <Footer />
                    </div>
                </main>
            </div>
        </>
    );
}
