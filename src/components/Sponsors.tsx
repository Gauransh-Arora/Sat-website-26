import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import peacock from "../assets/peacock.png";
import bird from "../assets/bird.png";
import sponsorFrameImg from "../assets/sponsor_frame.png";

import "./Sponsors.css";

gsap.registerPlugin(ScrollTrigger);

const SponsorFrame = ({ className = "" }) => (
  <img 
    src={sponsorFrameImg} 
    alt="Sponsor Frame" 
    className={`sponsor-frame ${className}`} 
  />
);

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
          <img src={bird} alt="Peacock" onLoad={() => setTimeout(() => ScrollTrigger.refresh(), 100)} />
        </div>

        {/* CONTENT */}
        <div className="sponsors-content">
          
          {/* TITLE SPONSOR GROUP */}
          <div className="sponsor-group title-sponsor-group">
            <div className="sponsor-intro-texts">
              <h3 className="sponsor-heading-gothic">Our Sponsors</h3>
              <h2 className="sponsor-heading-cursive">The Brands That Made Saturnalia Possible</h2>
            </div>
            <div className="title-sponsor-layout">
              <div className="title-sponsor-vertical-text">
                Title Sponsor
              </div>
              <div className="frame-wrapper title-frame">
                <SponsorFrame />
              </div>
            </div>
          </div>

          {/* CO-TITLE SPONSORS GROUP */}
          <div className="sponsor-group co-title-group">
            <h3 className="sponsor-heading-gothic">Co-Title Sponsors</h3>
            <div className="co-title-grid">
              {[...Array(4)].map((_, i) => (
                <div key={`co-${i}`} className="frame-wrapper co-title-frame">
                  <SponsorFrame />
                </div>
              ))}
            </div>
          </div>

          {/* POWER SPONSORS GROUP */}
          <div className="sponsor-group power-group">
            <h3 className="sponsor-heading-gothic">Power Sponsors</h3>
            <div className="power-grid">
              {[...Array(21)].map((_, i) => (
                <div key={`power-${i}`} className="frame-wrapper power-frame">
                  <SponsorFrame />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* LOTUS */}
        <div className="sponsors-lotus">
          <img src={peacock} alt="Lotus" onLoad={() => setTimeout(() => ScrollTrigger.refresh(), 100)} />
        </div>

      </div>
    </section>
  );
}
