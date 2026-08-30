import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import frame1 from "../assets/frame1.jpeg";
import frame2 from "../assets/frame2.jpeg";
import frame3 from "../assets/frame3.jpeg";
import frame4 from "../assets/frame4.jpeg";
import logo from "../assets/logo.png";

import "./DestinationScroller.css";

gsap.registerPlugin(ScrollTrigger, Observer);

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
       * Source of truth: Dribbble Roto-transitions clip
       * https://cdn.dribbble.com/userupload/25500276/file/small-fc586f02ea76e3a56db6ebbb5e5784dd.mp4
       *
       * ~18.4s / 60fps. Three concentric layers of the
       * same photo (inner disc, outer ring, full bleed).
       * Inner leads, outer follows, background last.
       * Photos spin with their layer. Image cuts at
       * peak angular speed. Layers only line up at rest.
       */
      const ROTATION = 360;
      const SPIN_DURATION = 1.85;
      const STAGGER = 0.22;
      const ROTO_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
      const STEP_DURATION = SPIN_DURATION + STAGGER * 2;

      const INNER_CROSS_START = SPIN_DURATION * 0.5;
      const OUTER_CROSS_START = STAGGER + SPIN_DURATION * 0.5;
      const BG_CROSS_START = STAGGER * 2 + SPIN_DURATION * 0.5;
      const CROSS_DURATION = 0.12;

      const STEPS = destinations.length - 1;


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
        (el) => gsap.set(el, { opacity: 1 }),
      );

      [
        innerImg.next, innerImg.third, innerImg.fourth,
        outerImg.next, outerImg.third, outerImg.fourth,
      ].forEach(
        (el) => gsap.set(el, { opacity: 0 }),
      );


      /* =====================================================
         INITIAL BACKGROUND STATE
      ===================================================== */

      gsap.set(bg.current, {
        opacity: 1,
        rotation: 0,
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      [bg.next, bg.third, bg.fourth].forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          rotation: 0,
          scale: 1,
          xPercent: -50,
          yPercent: -50,
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

        const cut = (
          outgoing: Element,
          incoming: Element,
          at: number,
        ) => {
          tl.to(
            outgoing,
            { opacity: 0, duration: CROSS_DURATION, ease: "none" },
            at,
          );
          tl.fromTo(
            incoming,
            { opacity: 0 },
            {
              opacity: 1,
              duration: CROSS_DURATION,
              ease: "none",
              immediateRender: false,
            },
            at,
          );
        };

        tl.to(
          inner,
          {
            rotation: `+=${ROTATION}`,
            duration: SPIN_DURATION,
            ease: ROTO_EASE,
            force3D: true,
          },
          0,
        );

        tl.to(
          outer,
          {
            rotation: `+=${ROTATION}`,
            duration: SPIN_DURATION,
            ease: ROTO_EASE,
            force3D: true,
          },
          STAGGER,
        );

        tl.to(
          bgOut,
          {
            rotation: `+=${ROTATION}`,
            duration: SPIN_DURATION,
            ease: ROTO_EASE,
            force3D: true,
          },
          STAGGER * 2,
        );

        cut(innerOut, innerIn, INNER_CROSS_START);
        cut(outerOut, outerIn, OUTER_CROSS_START);
        cut(bgOut, bgIn, BG_CROSS_START);

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

         One snap = one complete destination change.
         A wheel tick / swipe settles on the next frame
         instead of leaving the spin half-finished.
      ===================================================== */

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        anticipatePin: 1,
      });

      /*
       * Time-based playback, not scrub. Scrub+snap made
       * the spin trail the wheel and hitch every tick.
       * One gesture plays one full destination change.
       */
      let step = 0;
      let busy = false;

      const playStep = (next: number) => {
        const clamped = gsap.utils.clamp(0, STEPS, next);
        if (busy || clamped === step) return;

        busy = true;
        step = clamped;

        gsap.to(master, {
          totalProgress: clamped / STEPS,
          duration: STEP_DURATION,
          ease: "none",
          overwrite: true,
          onComplete: () => {
            busy = false;
          },
        });
      };

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        tolerance: 12,
        preventDefault: true,
        onDown: () => playStep(step + 1),
        onUp: () => playStep(step - 1),
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
          <div className="vinyl-clip">
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

        {/* INNER FRAME */}
        <div className="vinyl-frame frame-inner">
          <div className="vinyl-clip">
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

      </div>

    </section>
  );
}