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

const destinations = [frame1, frame2, frame3, frame4];


export default function DestinationScroller() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {


      /* =====================================================
         ELEMENTS
      ===================================================== */

      const inner = section.querySelector<HTMLElement>(
        ".frame-inner",
      )!;

      const outer = section.querySelector<HTMLElement>(
        ".frame-outer",
      )!;


      /* =====================================================
         PER-FRAME IMAGE ELEMENTS

         Kept separate because the inner circle reveals
         the next image before the outer circle does.
      ===================================================== */

      const innerImg = {
        current: inner.querySelector(".current-image")!,
        next:    inner.querySelector(".next-image")!,
        third:   inner.querySelector(".third-image")!,
        fourth:  inner.querySelector(".fourth-image")!,
      };

      const outerImg = {
        current: outer.querySelector(".current-image")!,
        next:    outer.querySelector(".next-image")!,
        third:   outer.querySelector(".third-image")!,
        fourth:  outer.querySelector(".fourth-image")!,
      };


      /* =====================================================
         BACKGROUND ELEMENTS
      ===================================================== */

      const bg = {
        current: section.querySelector(".background-current")!,
        next:    section.querySelector(".background-next")!,
        third:   section.querySelector(".background-third")!,
        fourth:  section.querySelector(".background-fourth")!,
      };


      /* =====================================================
         TIMING CONSTANTS
      ===================================================== */

      /*
       * Full rotation per transition.
       */
      const ROTATION = 360;

      /*
       * Duration of each frame's 360° spin.
       */
      const SPIN_DURATION = 2.2;

      /*
       * Outer frame starts this many seconds after
       * the inner frame.
       */
      const STAGGER = 0.5;

      /*
       * Inner image cross begins at ~66% through
       * the inner frame's rotation.
       *
       * 2.2 × 0.66 ≈ 1.45
       */
      const INNER_CROSS_START = 1.45;

      /*
       * Outer image cross begins at ~57% through
       * the outer frame's rotation, measured from
       * the outer frame's own start.
       *
       * 0.5 + 2.2 × 0.57 ≈ 1.75
       */
      const OUTER_CROSS_START = 1.75;

      /*
       * Duration of each fade+scale image cross.
       */
      const CROSS_DURATION = 0.55;

      /*
       * Background crossfade lands right as the
       * outer ring's reveal finishes.
       */
      const BG_FADE_START = 1.85;
      const BG_FADE_DURATION = 0.7;

      /*
       * Hold on the settled state before the next
       * transition begins.
       */
      const HOLD = 1.2;


      /* =====================================================
         INITIAL FRAME STATE

         GSAP controls xPercent/yPercent for centering
         and rotation for the spin.
      ===================================================== */

      [inner, outer].forEach((frame) => {
        gsap.set(frame, {
          xPercent: -50,
          yPercent: -50,
          rotation: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });


      /* =====================================================
         INITIAL IMAGE STATE

         All images at opacity 1 (visible) or 0 (hidden).
         Scale starts at 1 for visible, will be animated.
      ===================================================== */

      [innerImg.current, outerImg.current].forEach(
        (el) => gsap.set(el, { opacity: 1, scale: 1 }),
      );

      [
        innerImg.next, innerImg.third, innerImg.fourth,
        outerImg.next, outerImg.third, outerImg.fourth,
      ].forEach(
        (el) => gsap.set(el, { opacity: 0, scale: 1 }),
      );


      /* =====================================================
         INITIAL BACKGROUND STATE
      ===================================================== */

      gsap.set(bg.current, {
        opacity: 1,
        rotation: 0,
        scale: 1.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      [bg.next, bg.third, bg.fourth].forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          rotation: 0,
          scale: 1.04,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });


      /* =====================================================
         createTransition()

         Builds one transition timeline for any
         (current → next) destination change.
      ===================================================== */

      interface TransitionArgs {
        innerOut: Element;
        innerIn:  Element;
        outerOut: Element;
        outerIn:  Element;
        bgOut:    Element;
        bgIn:     Element;
      }

      function createTransition({
        innerOut,
        innerIn,
        outerOut,
        outerIn,
        bgOut,
        bgIn,
      }: TransitionArgs) {

        const tl = gsap.timeline();


        /* -------------------------------------------------
           INNER FRAME ROTATION

           +360°, starts at t=0
        ------------------------------------------------- */

        tl.to(
          inner,
          {
            rotation: `+=${ROTATION}`,
            duration: SPIN_DURATION,
            ease: "power3.inOut",
            force3D: true,
          },
          0,
        );


        /* -------------------------------------------------
           OUTER FRAME ROTATION

           +360°, starts at t=STAGGER
        ------------------------------------------------- */

        tl.to(
          outer,
          {
            rotation: `+=${ROTATION}`,
            duration: SPIN_DURATION,
            ease: "power3.inOut",
            force3D: true,
          },
          STAGGER,
        );


        /* -------------------------------------------------
           INNER IMAGE CROSS

           At ~66% through the inner frame's rotation:
           - outgoing: opacity 1→0, scale 1→1.2
           - incoming: opacity 0→1, scale 1.2→1
        ------------------------------------------------- */

        tl.to(
          innerOut,
          {
            opacity: 0,
            scale: 1.2,
            duration: CROSS_DURATION,
            ease: "power2.inOut",
          },
          INNER_CROSS_START,
        );

        tl.fromTo(
          innerIn,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            scale: 1,
            duration: CROSS_DURATION,
            ease: "power2.inOut",
          },
          INNER_CROSS_START,
        );


        /* -------------------------------------------------
           OUTER IMAGE CROSS

           A beat later, at ~57% through the outer
           frame's own rotation:
           - outgoing: opacity 1→0, scale 1→1.2
           - incoming: opacity 0→1, scale 1.2→1
        ------------------------------------------------- */

        tl.to(
          outerOut,
          {
            opacity: 0,
            scale: 1.2,
            duration: CROSS_DURATION,
            ease: "power2.inOut",
          },
          OUTER_CROSS_START,
        );

        tl.fromTo(
          outerIn,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            scale: 1,
            duration: CROSS_DURATION,
            ease: "power2.inOut",
          },
          OUTER_CROSS_START,
        );


        /* -------------------------------------------------
           BACKGROUND DRIFT

           Slow rotate(0→8°) + scale(1.04→1.08)
           on the outgoing background for ambient motion
           while it's still visible.
        ------------------------------------------------- */

        tl.fromTo(
          bgOut,
          { rotation: 0, scale: 1.04 },
          {
            rotation: 8,
            scale: 1.08,
            duration: 2.7,
            ease: "power2.inOut",
            force3D: true,
          },
          0,
        );


        /* -------------------------------------------------
           BACKGROUND CROSSFADE

           Timed to land right as the outer ring's
           reveal finishes.
        ------------------------------------------------- */

        tl.to(
          bgOut,
          {
            opacity: 0,
            duration: BG_FADE_DURATION,
            ease: "power2.inOut",
          },
          BG_FADE_START,
        );

        tl.fromTo(
          bgIn,
          { opacity: 0, rotation: 0, scale: 1.04 },
          {
            opacity: 1,
            rotation: 0,
            scale: 1.04,
            duration: BG_FADE_DURATION,
            ease: "power2.inOut",
            force3D: true,
          },
          BG_FADE_START,
        );


        return tl;
      }


      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const master = gsap.timeline({ paused: true });


      /* =====================================================
         TRANSITION 1 — IMAGE 1 → IMAGE 2
      ===================================================== */

      master.add(
        createTransition({
          innerOut: innerImg.current,
          innerIn:  innerImg.next,
          outerOut: outerImg.current,
          outerIn:  outerImg.next,
          bgOut:    bg.current,
          bgIn:     bg.next,
        }),
      );

      master.to({}, { duration: HOLD });


      /* =====================================================
         TRANSITION 2 — IMAGE 2 → IMAGE 3
      ===================================================== */

      master.add(
        createTransition({
          innerOut: innerImg.next,
          innerIn:  innerImg.third,
          outerOut: outerImg.next,
          outerIn:  outerImg.third,
          bgOut:    bg.next,
          bgIn:     bg.third,
        }),
      );

      master.to({}, { duration: HOLD });


      /* =====================================================
         TRANSITION 3 — IMAGE 3 → IMAGE 4
      ===================================================== */

      master.add(
        createTransition({
          innerOut: innerImg.third,
          innerIn:  innerImg.fourth,
          outerOut: outerImg.third,
          outerIn:  outerImg.fourth,
          bgOut:    bg.third,
          bgIn:     bg.fourth,
        }),
      );


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

    return () => ctx.revert();

  }, []);


  /* =======================================================
     JSX
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      className="destination-section"
    >

      {/* ==================================================
          BACKGROUND LAYER
      ================================================== */}

      <div className="destination-background">
        {destinations.map((src, i) => (
          <img
            key={i}
            className={
              ["background-current",
               "background-next",
               "background-third",
               "background-fourth"][i]
            }
            src={src}
            alt=""
          />
        ))}
      </div>


      {/* ==================================================
          VINYL CONTAINER
      ================================================== */}

      <div className="vinyl-container">

        {/* LOGO */}
        <img
          src={logo}
          alt="Logo"
          className="vinyl-logo"
        />

        {/* OUTER FRAME */}
        <div className="vinyl-frame frame-outer">
          {destinations.map((src, i) => (
            <img
              key={i}
              className={
                "vinyl-image " +
                ["current-image",
                 "next-image",
                 "third-image",
                 "fourth-image"][i]
              }
              src={src}
              alt=""
            />
          ))}
        </div>

        {/* INNER FRAME */}
        <div className="vinyl-frame frame-inner">
          {destinations.map((src, i) => (
            <img
              key={i}
              className={
                "vinyl-image " +
                ["current-image",
                 "next-image",
                 "third-image",
                 "fourth-image"][i]
              }
              src={src}
              alt=""
            />
          ))}
        </div>

      </div>

    </section>
  );
}