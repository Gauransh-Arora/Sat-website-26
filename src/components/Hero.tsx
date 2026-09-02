import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Hero.css"
import bgImage from "../assets/bg.png";
import satwallVideo from "../assets/SATwall.webm";
import flowerImage from "../assets/flower.png";
import logoImage from "../assets/logo.png";
import afterMovieFrame from "../assets/aftermovie_frame.png";
import M from "../assets/M.png";
import Navbar from "./Navbar";
import Sponsors from "./Sponsors";
import FAQSection from "./FAQSection";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* =====================================================
         HERO
      ===================================================== */

      const hero = document.querySelector(".hero");
      const heroImage = document.querySelector(".hero-image");
      const heroTitle = document.querySelector(".hero-title");
      const heroMeta = document.querySelector(".hero-meta");
      const heroNav = document.querySelector(".hero-nav");

      const heroTL = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });

      heroTL
        .to(
          heroImage,
          {
            scale: 1.15,
            yPercent: -8,
            ease: "none",
          },
          0
        )
        .to(
          heroTitle,
          {
            yPercent: -30,
            opacity: 0.2,
            ease: "none",
          },
          0
        )
        .to(
          heroMeta,
          {
            yPercent: -80,
            opacity: 0,
            ease: "none",
          },
          0
        )
        .to(
          heroNav,
          {
            yPercent: -60,
            opacity: 0,
            ease: "none",
          },
          0
        );


      /* =====================================================
         HERO CIRCLE TRANSITION
      ===================================================== */

      const circleText = document.querySelector(".semicircle-content");

      gsap.fromTo(
        circleText,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".circle-transition",
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      const archText = document.querySelector(".arch-text") as HTMLElement | null;
      if (archText) {
        ScrollTrigger.create({
          trigger: ".circle-transition",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            archText.style.wordSpacing = `${self.progress * 5}rem`;
          }
        });
      }


      /* =====================================================
         BUILT TO STAY
      ===================================================== */

      const builtSection = document.querySelector(".built-section");
      const builtTitle = document.querySelector(".built-title");
      const builtImage = document.querySelector(".built-image");

      gsap.fromTo(
        builtTitle,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: builtSection,
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        builtImage,
        {
          y: 100,
          scale: 1.12,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: builtSection,
            start: "top 70%",
            end: "top 25%",
            scrub: true,
          },
        }
      );


      /* =====================================================
         RESIDENCE IMAGE
      ===================================================== */

      const residence = document.querySelector(".residence-section");
      const residenceImage = document.querySelector(
        ".residence-image"
      );
      const residenceText = document.querySelector(
        ".residence-copy"
      );

      const residenceTL = gsap.timeline({
        scrollTrigger: {
          trigger: residence,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      residenceTL
        .fromTo(
          residenceImage,
          {
            scale: 1.15,
            yPercent: 8,
          },
          {
            scale: 1,
            yPercent: -8,
            ease: "none",
          },
          0
        )
        .fromTo(
          residenceText,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
          },
          0.1
        );


      /* =====================================================
         CONCEPT SECTION
      ===================================================== */

      const concept = document.querySelector(".concept-section");
      const conceptTitle = document.querySelector(".concept-title");
      const conceptText = document.querySelector(".concept-text");

      gsap.fromTo(
        conceptTitle,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: concept,
            start: "top 75%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        conceptText,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: concept,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        }
      );


      /* =====================================================
         FLOWERS
      ===================================================== */

      const flowers = document.querySelectorAll(".flower");

      flowers.forEach((flower, index) => {
        gsap.to(flower, {
          y: index % 2 === 0 ? -60 : 60,
          rotation: index % 2 === 0 ? -3 : 3,
          ease: "none",
          scrollTrigger: {
            trigger: flower.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });


      /* =====================================================
         GOLDEN MILE
      ===================================================== */

      const goldenSection = document.querySelector(
        ".golden-mile-section"
      );

      const goldenImage = document.querySelector(
        ".golden-image"
      );

      const goldenTitle = document.querySelector(
        ".golden-title"
      );

      const goldenTL = gsap.timeline({
        scrollTrigger: {
          trigger: goldenSection,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      goldenTL
        .fromTo(
          goldenImage,
          {
            xPercent: 100,
          },
          {
            xPercent: 0,
            ease: "none",
          },
          0
        )
        .fromTo(
          goldenTitle,
          {
            x: -80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "none",
          },
          0.1
        );


      /* =====================================================
         GOLDEN IMAGE PARALLAX
      ===================================================== */

      gsap.to(goldenImage, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: goldenSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });


      /* =====================================================
         COAST SECTION
      ===================================================== */

      const coast = document.querySelector(".coast-section");
      const coastTitle = document.querySelector(".coast-title");
      const coastText = document.querySelector(".coast-text");
      const coastLine = document.querySelector(".coast-line");

      gsap.fromTo(
        coastTitle,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: coast,
            start: "top 75%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        coastText,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: coast,
            start: "top 65%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        coastLine,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: coast,
            start: "top 60%",
            end: "top 25%",
            scrub: true,
          },
        }
      );


      /* =====================================================
         AERIAL / LOCATION
      ===================================================== */

      const aerial = document.querySelector(".aerial-section");
      const aerialImage = document.querySelector(".aerial-image");
      const aerialOverlay = document.querySelector(
        ".aerial-overlay"
      );

      const aerialTL = gsap.timeline({
        scrollTrigger: {
          trigger: aerial,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      aerialTL
        .fromTo(
          aerialImage,
          {
            scale: 1.2,
            yPercent: 8,
          },
          {
            scale: 1,
            yPercent: -8,
            ease: "none",
          },
          0
        )
        .fromTo(
          aerialOverlay,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: "none",
          },
          0.2
        );


      /* =====================================================
         GLOBAL REVEALS
      ===================================================== */

      gsap.utils.toArray<Element>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });


      /* =====================================================
         REFRESH
      ===================================================== */

      ScrollTrigger.refresh();
    }, appRef);

    return () => {
      ctx.revert();

      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleBeginClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Video playback was prevented:", err);
          });
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      videoRef.current.load();
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(".circle-transition", {
        duration: 2.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const nextSection = document.querySelector(".circle-transition");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main ref={appRef}>

      <div className="fixed-bg">
        <video
          ref={videoRef}
          src={satwallVideo}
          poster={bgImage}
          className="hero-image hero-video"
          playsInline
          preload="auto"
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
          aria-hidden="true"
        />
      </div>

      {/* =====================================================
          GLOBAL NAV
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-title">
          <img
            src={logoImage}
            alt="Saturnalia Logo"
            className={`hero-center-logo ${isPlaying ? "fade-out" : ""}`}
          />
        </div>

        {!hasEnded && (
          <div className={`hero-begin-wrapper ${isPlaying ? "fade-out" : ""}`}>
            <button
              className="hero-begin-btn"
              onClick={handleBeginClick}
              aria-label="Begin video experience"
            >
              <span className="btn-text">BEGIN</span>
              <span className="btn-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </span>
            </button>
          </div>
        )}

      </section>


      {/* =====================================================
          CIRCLE TRANSITION
      ===================================================== */}

      <section className="circle-transition">
        <div className="hero-circle">
          
          <svg className="arch-text-svg" viewBox="0 0 1000 500">
            <path id="arch-path" d="M 80 500 A 420 420 0 0 1 920 500" fill="transparent" />
            <text className="arch-text">
              <textPath href="#arch-path" startOffset="50%" textAnchor="middle">
                The Ascension of Legacy
              </textPath>
            </text>
          </svg>

          <div className="semicircle-wrapper">
            <div className="semicircle-top">
              <div className="flower-text-left">51st</div>
              <img src={flowerImage} alt="Flower icon" className="flower-icon" />
              <div className="flower-text-right">EDITION</div>
            </div>
            
            <div className="semicircle-divider"></div>
            
            <div className="semicircle-bottom-text">
              A Fest to Live - To<br />
              Return Year After Year
            </div>
          </div>
        </div>

      </section>


      {/* =====================================================
          MEMORIES OF YESTERYEAR
      ===================================================== */}

      <section className="memories-section">
        <h2 className="memories-title">MEMORIES OF YESTERYEAR</h2>
        
        <div className="video-container">
          <img src={afterMovieFrame} alt="Frame" className="video-frame" />
          <div className="iframe-wrapper">
             <iframe width="560" height="315" src="https://www.youtube.com/embed/sYe0Ssz0M3s?si=nmK1ZAPvdfGeGXxt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </section>


      {/* =====================================================
          RESIDENCE IMAGE
      ===================================================== */}

      <section className="residence-section">

        <div className="residence-intro-text">
          <p>From Unforgettable Performances To Electric Crowds, Saturnalia 2025 Was A<br/>Celebration Like No Other.</p>
          <br/>
          <p>Relive The Moments. Feel The Energy.<br/>And Get Ready For What's Next.</p>
        </div>

        <div className="residence-image-wrapper">
          <img
            src={M}
            alt=""
            className="residence-image"
          />
        </div>

        <div className="residence-overlay" />

        

      </section>


      {/* =====================================================
          CONCEPT
      ===================================================== */}

      <Sponsors/>
      <FAQSection/>
      <Footer/>




   

    </main>
  );
}