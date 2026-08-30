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


/* =========================================================
   CIRCULAR WIPE PATH
========================================================= */

function createWedgePath(progress) {
  const cx = 50;
  const cy = 50;
  const radius = 72;

  /*
   * Start at the top of the circle.
   *
   * Progress:
   * 0   = no reveal
   * 1   = complete reveal
   */

  if (progress <= 0) {
    return `M ${cx} ${cy} L ${cx} ${cy} Z`;
  }

  if (progress >= 1) {
    return `
      M ${cx} ${cy - radius}
      A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius}
      Z
    `;
  }

  const angle = -Math.PI / 2 + progress * Math.PI * 2;

  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;

  const largeArc = progress > 0.5 ? 1 : 0;

  return `
    M ${cx} ${cy - radius}
    A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y}
    L ${cx} ${cy}
    Z
  `;
}


export default function DestinationScroller2() {
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


      /* =====================================================
         INNER IMAGE ELEMENTS
      ===================================================== */

      const innerImages = {
        current: inner.querySelector(".current-image"),
        next: inner.querySelector(".next-image"),
        third: inner.querySelector(".third-image"),
        fourth: inner.querySelector(".fourth-image"),
      };


      /* =====================================================
         OUTER IMAGE ELEMENTS
      ===================================================== */

      const outerImages = {
        current: outer.querySelector(".current-image"),
        next: outer.querySelector(".next-image"),
        third: outer.querySelector(".third-image"),
        fourth: outer.querySelector(".fourth-image"),
      };


      /* =====================================================
         BACKGROUNDS
      ===================================================== */

      const backgrounds = {
        current: section.querySelector(".background-current"),
        next: section.querySelector(".background-next"),
        third: section.querySelector(".background-third"),
        fourth: section.querySelector(".background-fourth"),
      };


      /* =====================================================
         SVG WIPE ELEMENTS
      ===================================================== */

      const innerWipe =
        section.querySelector(".inner-wipe");

      const outerWipe =
        section.querySelector(".outer-wipe");


      /* =====================================================
         ANIMATION SETTINGS
      ===================================================== */

      const FRAME_ROTATION = 360;

      /*
       * Inner circle begins moving immediately.
       */
      const INNER_ROTATION_DURATION = 2.15;

      /*
       * Outer circle starts a little later.
       */
      const OUTER_ROTATION_DURATION = 2.15;

      const OUTER_STAGGER = 0.35;


      /*
       * Circular wipe timing.
       *
       * Notice that there is NO scale and NO opacity
       * animation on the destination images.
       */
      const INNER_WIPE_START = 0.55;

      const OUTER_WIPE_START = 0.95;

      const WIPE_DURATION = 1.15;


      /*
       * Background is intentionally kept independent.
       */
      const BACKGROUND_FADE_START = 1.8;

      const BACKGROUND_FADE_DURATION = 0.65;


      const HOLD_DURATION = 1.15;


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
         INITIAL IMAGE STATE
      ===================================================== */

      /*
       * Current image visible.
       *
       * Future images are present at normal scale and
       * normal opacity.
       *
       * They are hidden ONLY by their wipe mask.
       */

      gsap.set(
        [
          innerImages.current,
          outerImages.current,
        ],
        {
          opacity: 1,
        }
      );


      gsap.set(
        [
          innerImages.next,
          innerImages.third,
          innerImages.fourth,

          outerImages.next,
          outerImages.third,
          outerImages.fourth,
        ],
        {
          opacity: 1,
        }
      );


      /* =====================================================
         INITIAL WIPE STATE
      ===================================================== */

      gsap.set(innerWipe, {
        attr: {
          d: createWedgePath(0),
        },
      });


      gsap.set(outerWipe, {
        attr: {
          d: createWedgePath(0),
        },
      });


      /* =====================================================
         INITIAL BACKGROUND STATE
      ===================================================== */

      gsap.set(backgrounds.current, {
        opacity: 1,

        rotation: 0,

        scale: 1.04,

        transformOrigin: "50% 50%",

        force3D: true,
      });


      gsap.set(
        [
          backgrounds.next,
          backgrounds.third,
          backgrounds.fourth,
        ],
        {
          opacity: 0,

          rotation: 0,

          scale: 1.04,

          transformOrigin: "50% 50%",

          force3D: true,
        }
      );


      /* =====================================================
         WIPE FUNCTION
      ===================================================== */

      const revealWipe = (element, startTime) => {

        const progress = {
          value: 0,
        };

        return gsap.to(progress, {
          value: 1,

          duration: WIPE_DURATION,

          ease: "power2.inOut",

          onUpdate: () => {
            gsap.set(element, {
              attr: {
                d: createWedgePath(progress.value),
              },
            });
          },

          immediateRender: false,

        });
      };


      /* =====================================================
         TRANSITION CREATOR
      ===================================================== */

      const createTransition = ({
        currentInner,
        nextInner,

        currentOuter,
        nextOuter,

        currentBackground,
        nextBackground,
      }) => {

        const timeline = gsap.timeline();


        /* =================================================
           INNER FRAME ROTATION
        ================================================= */

        timeline.to(
          inner,
          {
            rotation: `+=${FRAME_ROTATION}`,

            duration: INNER_ROTATION_DURATION,

            ease: "power3.inOut",

            force3D: true,
          },
          0
        );


        /* =================================================
           OUTER FRAME ROTATION
        ================================================= */

        timeline.to(
          outer,
          {
            rotation: `+=${FRAME_ROTATION}`,

            duration: OUTER_ROTATION_DURATION,

            ease: "power3.inOut",

            force3D: true,
          },
          OUTER_STAGGER
        );


        /* =================================================
           INNER CIRCULAR WIPE
        ================================================= */

        const innerProgress = {
          value: 0,
        };


        timeline.to(
          innerProgress,
          {
            value: 1,

            duration: WIPE_DURATION,

            ease: "power2.inOut",

            onUpdate: () => {
              gsap.set(innerWipe, {
                attr: {
                  d: createWedgePath(
                    innerProgress.value
                  ),
                },
              });
            },
          },
          INNER_WIPE_START
        );


        /* =================================================
           OUTER CIRCULAR WIPE
        ================================================= */

        const outerProgress = {
          value: 0,
        };


        timeline.to(
          outerProgress,
          {
            value: 1,

            duration: WIPE_DURATION,

            ease: "power2.inOut",

            onUpdate: () => {
              gsap.set(outerWipe, {
                attr: {
                  d: createWedgePath(
                    outerProgress.value
                  ),
                },
              });
            },
          },
          OUTER_WIPE_START
        );


        /* =================================================
           BACKGROUND MOVEMENT
        ================================================= */

        timeline.fromTo(
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


        /* =================================================
           BACKGROUND CROSSFADE
        ================================================= */

        timeline.to(
          currentBackground,
          {
            opacity: 0,

            duration: BACKGROUND_FADE_DURATION,

            ease: "power2.inOut",
          },
          BACKGROUND_FADE_START
        );


        timeline.to(
          nextBackground,
          {
            opacity: 1,

            duration: BACKGROUND_FADE_DURATION,

            ease: "power2.inOut",
          },
          BACKGROUND_FADE_START
        );


        /* =================================================
           CLEANUP
        ================================================= */

        timeline.set(
          currentInner,
          {
            opacity: 0,
          }
        );


        timeline.set(
          currentOuter,
          {
            opacity: 0,
          }
        );


        /*
         * Reset wipe geometry so it can be reused.
         */
        timeline.set(
          innerWipe,
          {
            attr: {
              d: createWedgePath(0),
            },
          }
        );


        timeline.set(
          outerWipe,
          {
            attr: {
              d: createWedgePath(0),
            },
          }
        );


        return timeline;
      };


      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const master = gsap.timeline({
        paused: true,
      });


      /* =====================================================
         1 → 2
      ===================================================== */

      master.add(
        createTransition({
          currentInner: innerImages.current,
          nextInner: innerImages.next,

          currentOuter: outerImages.current,
          nextOuter: outerImages.next,

          currentBackground: backgrounds.current,
          nextBackground: backgrounds.next,
        })
      );


      master.to(
        {},
        {
          duration: HOLD_DURATION,
        }
      );


      /* =====================================================
         2 → 3
      ===================================================== */

      master.add(
        createTransition({
          currentInner: innerImages.next,
          nextInner: innerImages.third,

          currentOuter: outerImages.next,
          nextOuter: outerImages.third,

          currentBackground: backgrounds.next,
          nextBackground: backgrounds.third,
        })
      );


      master.to(
        {},
        {
          duration: HOLD_DURATION,
        }
      );


      /* =====================================================
         3 → 4
      ===================================================== */

      master.add(
        createTransition({
          currentInner: innerImages.third,
          nextInner: innerImages.fourth,

          currentOuter: outerImages.third,
          nextOuter: outerImages.fourth,

          currentBackground: backgrounds.third,
          nextBackground: backgrounds.fourth,
        })
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


    return () => {
      ctx.revert();
    };

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
          ROTATING CIRCULAR SYSTEM
      ================================================== */}

      <div className="vinyl-container">

        {/* =================================================
            LOGO
        ================================================= */}

        <img
          src={logo}
          alt="Logo"
          className="vinyl-logo"
        />


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


          {/* -----------------------------------------------
              OUTER ROTATING WIPE
          ----------------------------------------------- */}

          <svg
            className="frame-wipe-svg outer-wipe-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <defs>

              <clipPath id="outer-wipe-clip">

                <path
                  className="outer-wipe"
                  d={createWedgePath(0)}
                />

              </clipPath>

            </defs>

          </svg>

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


          {/* -----------------------------------------------
              INNER ROTATING WIPE
          ----------------------------------------------- */}

          <svg
            className="frame-wipe-svg inner-wipe-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <defs>

              <clipPath id="inner-wipe-clip">

                <path
                  className="inner-wipe"
                  d={createWedgePath(0)}
                />

              </clipPath>

            </defs>

          </svg>

        </div>

      </div>

    </section>
  );
}