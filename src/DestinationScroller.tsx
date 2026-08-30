import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import frame1 from "./assets/frame1.jpeg";
import frame2 from "./assets/frame2.jpeg";
import frame3 from "./assets/frame3.jpeg";
import frame4 from "./assets/frame4.jpeg";
import logo from "./assets/logo.png";

import "./DestinationScroller.css";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  frame1,
  frame2,
  frame3,
  frame4,
];

export default function DestinationScroller() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         ELEMENTS
      ===================================================== */

      const inner = section.querySelector(".frame-inner");
      const outer = section.querySelector(".frame-outer");

      /*
       * Keep image collections separate for each frame.
       *
       * This is important because the transition does NOT
       * reveal the next image in both circles at the same
       * time.
       */

      const innerCurrent =
        inner.querySelector(".current-image");

      const innerNext =
        inner.querySelector(".next-image");

      const innerThird =
        inner.querySelector(".third-image");

      const innerFourth =
        inner.querySelector(".fourth-image");


      const outerCurrent =
        outer.querySelector(".current-image");

      const outerNext =
        outer.querySelector(".next-image");

      const outerThird =
        outer.querySelector(".third-image");

      const outerFourth =
        outer.querySelector(".fourth-image");


      /* =====================================================
         BACKGROUND
      ===================================================== */

      const currentBackground =
        section.querySelector(".background-current");

      const nextBackground =
        section.querySelector(".background-next");

      const thirdBackground =
        section.querySelector(".background-third");

      const fourthBackground =
        section.querySelector(".background-fourth");


      /* =====================================================
         ANIMATION SETTINGS
      ===================================================== */

      const FRAME_ROTATION = 360;

      /*
       * Rotation duration.
       */
      const FRAME_DURATION = 2.2;

      /*
       * Outer frame starts slightly after inner frame.
       */
      const FRAME_STAGGER = 0.5;

      /*
       * The NEXT image starts appearing inside the
       * inner circle before the outer circle.
       */
      const INNER_REVEAL_START = 1.45;

      /*
       * The NEXT image then appears in the outer circle.
       */
      const OUTER_REVEAL_START = 1.75;

      /*
       * Duration of each circular image reveal.
       */
      const IMAGE_REVEAL_DURATION = 0.55;

      /*
       * Background transition.
       *
       * Kept separate from the circular mechanism.
       */
      const BACKGROUND_FADE_START = 1.85;

      const BACKGROUND_FADE_DURATION = 0.7;

      /*
       * Time between destinations.
       */
      const HOLD_DURATION = 1.2;


      /* =====================================================
         INITIAL FRAME STATE
      ===================================================== */

      gsap.set(inner, {
        xPercent: -50,
        yPercent: -50,

        rotation: 0,

        transformOrigin: "50% 50%",

        force3D: true,
      });

      gsap.set(outer, {
        xPercent: -50,
        yPercent: -50,

        rotation: 0,

        transformOrigin: "50% 50%",

        force3D: true,
      });


      /* =====================================================
         INITIAL INNER IMAGE STATE
      ===================================================== */

      gsap.set(innerCurrent, {
        opacity: 1,
      });

      gsap.set(innerNext, {
        opacity: 0,
      });

      gsap.set(innerThird, {
        opacity: 0,
      });

      gsap.set(innerFourth, {
        opacity: 0,
      });


      /* =====================================================
         INITIAL OUTER IMAGE STATE
      ===================================================== */

      gsap.set(outerCurrent, {
        opacity: 1,
      });

      gsap.set(outerNext, {
        opacity: 0,
      });

      gsap.set(outerThird, {
        opacity: 0,
      });

      gsap.set(outerFourth, {
        opacity: 0,
      });


      /* =====================================================
         INITIAL BACKGROUND STATE
      ===================================================== */

      gsap.set(currentBackground, {
        opacity: 1,

        rotation: 0,

        scale: 1.04,

        transformOrigin: "50% 50%",

        force3D: true,
      });

      gsap.set(nextBackground, {
        opacity: 0,

        rotation: 0,

        scale: 1.04,

        transformOrigin: "50% 50%",

        force3D: true,
      });

      gsap.set(thirdBackground, {
        opacity: 0,

        rotation: 0,

        scale: 1.04,

        transformOrigin: "50% 50%",

        force3D: true,
      });

      gsap.set(fourthBackground, {
        opacity: 0,

        rotation: 0,

        scale: 1.04,

        transformOrigin: "50% 50%",

        force3D: true,
      });


      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const master = gsap.timeline({
        paused: true,
      });


      /* =====================================================
         TRANSITION 1

         IMAGE 1 → IMAGE 2
      ===================================================== */

      const transition1 = gsap.timeline();


      /* -----------------------------------------------------
         INNER FRAME ROTATION
      ----------------------------------------------------- */

      transition1.to(
        inner,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        0
      );


      /* -----------------------------------------------------
         OUTER FRAME ROTATION
      ----------------------------------------------------- */

      transition1.to(
        outer,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        FRAME_STAGGER
      );


      /* -----------------------------------------------------
         INNER CIRCLE REVEALS NEXT IMAGE FIRST
      ----------------------------------------------------- */

      transition1.to(
        innerCurrent,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );

      transition1.fromTo(
        innerNext,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );


      /* -----------------------------------------------------
         OUTER CIRCLE REVEALS NEXT IMAGE SECOND
      ----------------------------------------------------- */

      transition1.to(
        outerCurrent,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );

      transition1.fromTo(
        outerNext,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );


      /* -----------------------------------------------------
         BACKGROUND

         The background changes underneath the circular
         transition rather than being the transition itself.
      ----------------------------------------------------- */

      transition1.fromTo(
        currentBackground,
        {
          rotation: 0,
          scale: 1.04,
        },
        {
          rotation: 8,
          scale: 1.08,

          duration: 2.7,

          ease: "power2.inOut",

          force3D: true,
        },
        0
      );


      transition1.to(
        currentBackground,
        {
          opacity: 0,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",
        },
        BACKGROUND_FADE_START
      );

      transition1.fromTo(
        nextBackground,
        {
          opacity: 0,

          rotation: 0,

          scale: 1.04,
        },
        {
          opacity: 1,

          rotation: 0,

          scale: 1.04,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",

          force3D: true,
        },
        BACKGROUND_FADE_START
      );


      master.add(transition1);


      /* =====================================================
         HOLD IMAGE 2
      ===================================================== */

      master.to(
        {},
        {
          duration: HOLD_DURATION,
        }
      );


      /* =====================================================
         TRANSITION 2

         IMAGE 2 → IMAGE 3
      ===================================================== */

      const transition2 = gsap.timeline();


      /* -----------------------------------------------------
         INNER FRAME ROTATION
      ----------------------------------------------------- */

      transition2.to(
        inner,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        0
      );


      /* -----------------------------------------------------
         OUTER FRAME ROTATION
      ----------------------------------------------------- */

      transition2.to(
        outer,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        FRAME_STAGGER
      );


      /* -----------------------------------------------------
         INNER CIRCLE

         IMAGE 2 → IMAGE 3
      ----------------------------------------------------- */

      transition2.to(
        innerNext,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );

      transition2.fromTo(
        innerThird,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );


      /* -----------------------------------------------------
         OUTER CIRCLE

         IMAGE 2 → IMAGE 3
      ----------------------------------------------------- */

      transition2.to(
        outerNext,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );

      transition2.fromTo(
        outerThird,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );


      /* -----------------------------------------------------
         BACKGROUND
      ----------------------------------------------------- */

      transition2.fromTo(
        nextBackground,
        {
          rotation: 0,
          scale: 1.04,
        },
        {
          rotation: 8,
          scale: 1.08,

          duration: 2.7,

          ease: "power2.inOut",

          force3D: true,
        },
        0
      );

      transition2.to(
        nextBackground,
        {
          opacity: 0,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",
        },
        BACKGROUND_FADE_START
      );

      transition2.fromTo(
        thirdBackground,
        {
          opacity: 0,

          rotation: 0,

          scale: 1.04,
        },
        {
          opacity: 1,

          rotation: 0,

          scale: 1.04,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",

          force3D: true,
        },
        BACKGROUND_FADE_START
      );


      master.add(transition2);


      /* =====================================================
         HOLD IMAGE 3
      ===================================================== */

      master.to(
        {},
        {
          duration: HOLD_DURATION,
        }
      );


      /* =====================================================
         TRANSITION 3

         IMAGE 3 → IMAGE 4
      ===================================================== */

      const transition3 = gsap.timeline();


      /* -----------------------------------------------------
         INNER FRAME ROTATION
      ----------------------------------------------------- */

      transition3.to(
        inner,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        0
      );


      /* -----------------------------------------------------
         OUTER FRAME ROTATION
      ----------------------------------------------------- */

      transition3.to(
        outer,
        {
          rotation: `+=${FRAME_ROTATION}`,

          duration: FRAME_DURATION,

          ease: "power3.inOut",

          force3D: true,
        },
        FRAME_STAGGER
      );


      /* -----------------------------------------------------
         INNER CIRCLE

         IMAGE 3 → IMAGE 4
      ----------------------------------------------------- */

      transition3.to(
        innerThird,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );

      transition3.fromTo(
        innerFourth,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        INNER_REVEAL_START
      );


      /* -----------------------------------------------------
         OUTER CIRCLE

         IMAGE 3 → IMAGE 4
      ----------------------------------------------------- */

      transition3.to(
        outerThird,
        {
          opacity: 0,
          scale: 1.2,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );

      transition3.fromTo(
        outerFourth,
        {
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          scale: 1,

          duration: IMAGE_REVEAL_DURATION,

          ease: "power2.inOut",
        },
        OUTER_REVEAL_START
      );


      /* -----------------------------------------------------
         BACKGROUND
      ----------------------------------------------------- */

      transition3.fromTo(
        thirdBackground,
        {
          rotation: 0,
          scale: 1.04,
        },
        {
          rotation: 8,
          scale: 1.08,

          duration: 2.7,

          ease: "power2.inOut",

          force3D: true,
        },
        0
      );

      transition3.to(
        thirdBackground,
        {
          opacity: 0,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",
        },
        BACKGROUND_FADE_START
      );

      transition3.fromTo(
        fourthBackground,
        {
          opacity: 0,

          rotation: 0,

          scale: 1.04,
        },
        {
          opacity: 1,

          rotation: 0,

          scale: 1.04,

          duration: BACKGROUND_FADE_DURATION,

          ease: "power2.inOut",

          force3D: true,
        },
        BACKGROUND_FADE_START
      );


      master.add(transition3);


      /* =====================================================
         SCROLLTRIGGER
      ===================================================== */

      ScrollTrigger.create({
        trigger: section,

        start: "top top",

        end: "+=4500",

        pin: true,

        scrub: 0.15,

        animation: master,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        fastScrollEnd: true,
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="destination-section"
    >

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="destination-background">

        <img
          className="background-current"
          src={destinations[0]}
          alt=""
        />

        <img
          className="background-next"
          src={destinations[1]}
          alt=""
        />

        <img
          className="background-third"
          src={destinations[2]}
          alt=""
        />

        <img
          className="background-fourth"
          src={destinations[3]}
          alt=""
        />

      </div>


      {/* ==================================================
          TWO FRAME VINYL
      ================================================== */}

      <div className="vinyl-container">

        {/* =================================================
            LOGO
        ================================================= */}
        <img src={logo} alt="Logo" className="vinyl-logo" />

        {/* =================================================
            OUTER FRAME
        ================================================= */}

        <div className="vinyl-frame frame-outer">

          <img
            className="vinyl-image current-image"
            src={destinations[0]}
            alt=""
          />

          <img
            className="vinyl-image next-image"
            src={destinations[1]}
            alt=""
          />

          <img
            className="vinyl-image third-image"
            src={destinations[2]}
            alt=""
          />

          <img
            className="vinyl-image fourth-image"
            src={destinations[3]}
            alt=""
          />

        </div>


        {/* =================================================
            INNER FRAME
        ================================================= */}

        <div className="vinyl-frame frame-inner">

          <img
            className="vinyl-image current-image"
            src={destinations[0]}
            alt=""
          />

          <img
            className="vinyl-image next-image"
            src={destinations[1]}
            alt=""
          />

          <img
            className="vinyl-image third-image"
            src={destinations[2]}
            alt=""
          />

          <img
            className="vinyl-image fourth-image"
            src={destinations[3]}
            alt=""
          />

        </div>

      </div>

    </section>
  );
}