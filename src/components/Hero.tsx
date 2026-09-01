import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./Hero.css"
import bgImage from "../assets/bg.png";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    function raf(time) {
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

      const circleText = document.querySelector(".circle-content");

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

      gsap.utils.toArray(".reveal-up").forEach((element) => {
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
    };
  }, []);

  return (
    <main ref={appRef}>

      <div className="fixed-bg">
        <img
          src={bgImage}
          alt=""
          className="hero-image"
        />
      </div>

      {/* =====================================================
          GLOBAL NAV
      ===================================================== */}

      <header className="site-header">
        <div className="header-logo">
          ERA
        </div>

        <div className="header-right">
          <span>MENU</span>
          <span>EN</span>
        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">


        <div className="hero-meta">
          <span>01</span>
          <span>ESTEPONA</span>
        </div>

        <nav className="hero-nav">
          <span>A PLACE</span>
          <span>TO RETURN TO</span>
        </nav>

        <div className="hero-title">
          <div className="hero-title-main">
            ERA
          </div>

          <div className="hero-title-sub">
            RESIDENCE
          </div>

          <div className="hero-location">
            ESTEPONA
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-arrow">↓</span>
        </div>

      </section>


      {/* =====================================================
          CIRCLE TRANSITION
      ===================================================== */}

      <section className="circle-transition">

        <div className="hero-circle">

          <div className="circle-content">

            <div className="circle-small">
              ERA RESIDENCE
            </div>

            <h2>
              BUILT
              <br />
              TO STAY
            </h2>

            <div className="circle-description">
              A private collection of residences
              created for living beautifully.
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BUILT TO STAY
      ===================================================== */}

      <section className="built-section">

        <div className="built-top">
          <span>02</span>
          <span>THE RESIDENCE</span>
        </div>

        <div className="built-content">

          <h2 className="built-title">
            BUILT TO
            <br />
            STAY
          </h2>

          <div className="built-image-wrapper">
            <img
              src="/images/built-stay.jpg"
              alt=""
              className="built-image"
            />
          </div>

          <p className="built-description">
            A contemporary interpretation of Mediterranean
            living, designed around space, light and a deep
            connection with the landscape.
          </p>

        </div>

      </section>


      {/* =====================================================
          RESIDENCE IMAGE
      ===================================================== */}

      <section className="residence-section">

        <div className="residence-image-wrapper">
          <img
            src="/images/residence.jpg"
            alt=""
            className="residence-image"
          />
        </div>

        <div className="residence-overlay" />

        <div className="residence-copy">

          <span className="eyebrow">
            THE RESIDENCES
          </span>

          <h2>
            Designed
            <br />
            around living.
          </h2>

          <p>
            Private homes surrounded by nature,
            architecture and the Mediterranean light.
          </p>

        </div>

      </section>


      {/* =====================================================
          CONCEPT
      ===================================================== */}

      <section className="concept-section">

        <img
          src="/images/flower-left.png"
          alt=""
          className="flower flower-left"
        />

        <img
          src="/images/flower-right.png"
          alt=""
          className="flower flower-right"
        />

        <div className="concept-inner">

          <span className="eyebrow">
            ERA RESIDENCE
          </span>

          <h2 className="concept-title">
            ERA RESIDENCES IS A
            <br />
            BOUTIQUE GATED
            <br />
            COMMUNITY.
          </h2>

          <p className="concept-text">
            A limited collection of homes created
            around a slower, more considered way
            of living.
          </p>

        </div>

      </section>


      {/* =====================================================
          GOLDEN MILE
      ===================================================== */}

      <section className="golden-mile-section">

        <div className="golden-copy">

          <span className="eyebrow">
            LOCATION
          </span>

          <h2 className="golden-title">
            NEW
            <br />
            GOLDEN
            <br />
            MILE
          </h2>

          <p>
            A privileged position on the Costa del
            Sol, close to the sea and everything
            Estepona has to offer.
          </p>

        </div>

        <div className="golden-image-wrapper">

          <img
            src="/images/golden-mile.jpg"
            alt=""
            className="golden-image"
          />

        </div>

      </section>


      {/* =====================================================
          COAST
      ===================================================== */}

      <section className="coast-section">

        <img
          src="/images/flower-left.png"
          alt=""
          className="flower flower-coast-left"
        />

        <img
          src="/images/flower-right.png"
          alt=""
          className="flower flower-coast-right"
        />

        <div className="coast-inner">

          <span className="eyebrow">
            THE MEDITERRANEAN
          </span>

          <h2 className="coast-title">
            THE COAST
            <br />
            YOU WANTED.
          </h2>

          <p className="coast-text">
            The sea, the mountains and the rhythm
            of southern Spain, all within reach.
          </p>

          <div className="coast-line" />

          <div className="coast-bottom">
            <span>MARBELLA</span>
            <span>ESTEPONA</span>
            <span>MEDITERRANEAN SEA</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          AERIAL / LOCATION
      ===================================================== */}

      <section className="aerial-section">

        <div className="aerial-image-wrapper">

          <img
            src="/images/aerial.jpg"
            alt=""
            className="aerial-image"
          />

        </div>

        <div className="aerial-overlay" />

        <div className="aerial-content">

          <span className="eyebrow">
            ESTEPONA · COSTA DEL SOL
          </span>

          <h2>
            YOUR PLACE
            <br />
            IN THE SUN.
          </h2>

        </div>

        <div className="aerial-bottom">
          <span>ERA RESIDENCE</span>
          <span>36°25'N · 5°08'W</span>
        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-logo">
          ERA
        </div>

        <div className="footer-links">
          <span>CONTACT</span>
          <span>LOCATION</span>
          <span>PRIVACY</span>
        </div>

        <div className="footer-bottom">
          © 2026 ERA RESIDENCE
        </div>

      </footer>

    </main>
  );
}