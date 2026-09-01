import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import peacock from "../assets/peacock.png";
import lotus from "../assets/lotus.png";
import designSymbol from "../assets/design_symbol.png";

import "./Sponsors.css";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Initialize Lenis for this specific component to ensure smooth inertial scrolling
    // as requested by the prompt ("Use Lenis for smooth/inertial scrolling")
    // but only if it's not already running globally. Since Hero.tsx is commented out
    // and doesn't run globally, we start one here and clean it up.
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;
    
    // Quick check to avoid double initialization if someone else started it globally
    if (!(window as any).lenis) {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      (window as any).lenis = lenis;

      raf = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1, // inertial scrub
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, section);

    return () => {
      ctx.revert();
      if (lenis) {
        if (raf) gsap.ticker.remove(raf);
        lenis.destroy();
        delete (window as any).lenis;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="sponsors-section">
      <div ref={trackRef} className="sponsors-track">
        
        {/* PEACOCK */}
        <div className="sponsors-peacock">
          <img src={peacock} alt="Peacock" />
        </div>

        {/* CONTENT */}
        <div className="sponsors-content">
          <div className="sponsors-title-container">
            <h2 className="sponsors-title-bg">Sponsors</h2>
            <h2 className="sponsors-title-fg">SPONSORS</h2>
          </div>

          <div className="sponsors-marquee-area">
            {/* TOP ROW */}
            <div className="sponsors-row top-row">
              {[...Array(6)].map((_, i) => (
                <div key={`top-${i}`} className="sponsor-symbol-wrapper">
                  <img src={designSymbol} alt="Design Symbol" className="design-symbol" />
                  <div className="sponsor-circle"></div>
                </div>
              ))}
            </div>

            {/* SUBTITLE */}
            <h3 className="sponsors-subtitle">
              THE WONDERFUL BRANDS THAT MADE SATURNALIA'25 POSSIBLE
            </h3>

            {/* BOTTOM ROW */}
            <div className="sponsors-row bottom-row">
              {[...Array(7)].map((_, i) => (
                <div key={`bottom-${i}`} className="sponsor-symbol-wrapper">
                  <img src={designSymbol} alt="Design Symbol" className="design-symbol" />
                  <div className="sponsor-circle"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOTUS */}
        <div className="sponsors-lotus">
          <img src={lotus} alt="Lotus" />
        </div>

      </div>
    </section>
  );
}
