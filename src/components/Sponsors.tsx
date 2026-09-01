import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    // Lenis is handled globally by Hero.tsx, so we don't initialize it here to avoid conflicts.


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
      // No lenis to clean up here since Hero handles it

    };
  }, []);

  return (
    <section ref={sectionRef} className="sponsors-section">
      <div ref={trackRef} className="sponsors-track">
        
        {/* PEACOCK */}
        <div className="sponsors-peacock">
          <img src={peacock} alt="Peacock" onLoad={() => ScrollTrigger.refresh()} />
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
          <img src={lotus} alt="Lotus" onLoad={() => ScrollTrigger.refresh()} />
        </div>

      </div>
    </section>
  );
}
