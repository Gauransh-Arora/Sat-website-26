import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import {
  Menu,
  Search,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

import frame1 from "../assets/frame1.jpeg";
import frame2 from "../assets/frame2.jpeg";
import frame3 from "../assets/frame3.jpeg";
import frame4 from "../assets/frame4.jpeg";

import "./DiscHero.css";


/* =========================================================
   DATA
========================================================= */

const SLIDES = [
  {
    title: "HIGHLANDS",
    place: "SCOTLAND",
    img: frame1,
  },
  {
    title: "SAHARA",
    place: "MOROCCO",
    img: frame2,
  },
  {
    title: "DOLOMITES",
    place: "ITALY",
    img: frame3,
  },
  {
    title: "MALDIVES",
    place: "INDIAN OCEAN",
    img: frame4,
  },
];


/* =========================================================
   TIMING
========================================================= */

const TOTAL_MS = 900;

const HALF_MS = TOTAL_MS / 2;

const AUTOPLAY_MS = 5000;


/* =========================================================
   PINWHEEL CLIP-PATH

   Builds a jagged, low-poly polygon with alternating
   outer/inner radius points — reads as angular facets,
   not a smooth circle.
========================================================= */

function pinwheelClipPath(
  spikes = 9,
  outerR = 50,
  innerR = 30,
) {
  const pts: string[] = [];
  const step = Math.PI / spikes;

  let angle = -Math.PI / 2;

  for (let i = 0; i < spikes; i++) {
    pts.push(
      `${(50 + Math.cos(angle) * outerR).toFixed(2)}% ` +
      `${(50 + Math.sin(angle) * outerR).toFixed(2)}%`
    );

    angle += step;

    pts.push(
      `${(50 + Math.cos(angle) * innerR).toFixed(2)}% ` +
      `${(50 + Math.sin(angle) * innerR).toFixed(2)}%`
    );

    angle += step;
  }

  return `polygon(${pts.join(", ")})`;
}


/* =========================================================
   CONCENTRIC RING SIZES (px)
========================================================= */

const RING_SIZES = [420, 320, 220];


/* =========================================================
   COMPONENT
========================================================= */

export default function DiscHero() {

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [current, setCurrent] = useState(0);

  /*
   * `pending` holds the index of the incoming slide
   * while a spin is in progress, otherwise null.
   */
  const [pending, setPending] = useState<number | null>(
    null,
  );

  const [spinning, setSpinning] = useState(false);

  /*
   * Incrementing key forces React to remount the disc
   * element, which restarts the CSS animation cleanly.
   */
  const [spinKey, setSpinKey] = useState(0);

  const [textVisible, setTextVisible] = useState(true);

  const timers = useRef<ReturnType<typeof setTimeout>[]>(
    [],
  );


  /* -------------------------------------------------------
     REDUCED MOTION
  ------------------------------------------------------- */

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches,
    [],
  );


  /* -------------------------------------------------------
     CLIP-PATH (computed once)
  ------------------------------------------------------- */

  const clipPath = useMemo(
    () => pinwheelClipPath(),
    [],
  );


  /* -------------------------------------------------------
     TIMER CLEANUP
  ------------------------------------------------------- */

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);


  /* -------------------------------------------------------
     goTo — CORE TRANSITION FUNCTION

     Takes (currentImage, nextImage) through state,
     fires the spin, swaps at the halfway mark, and
     calls cleanup on completion.
  ------------------------------------------------------- */

  const goTo = useCallback(
    (index: number) => {

      /*
       * Guard: ignore if already spinning or same slide.
       */
      if (spinning || index === current) return;

      /*
       * Reduced motion: instant cut.
       */
      if (prefersReducedMotion) {
        setCurrent(index);
        return;
      }

      setSpinning(true);
      setPending(index);
      setTextVisible(false);
      setSpinKey((k) => k + 1);

      timers.current.push(

        /*
         * At 50% of the spin, swap the full-frame
         * background. The disc is showing the incoming
         * image, so this hard cut is invisible.
         */
        setTimeout(
          () => setCurrent(index),
          HALF_MS,
        ),

        /*
         * At 100%, the spin is done. Reset everything.
         */
        setTimeout(() => {
          setSpinning(false);
          setPending(null);
          setTextVisible(true);
        }, TOTAL_MS),

      );
    },
    [current, spinning, prefersReducedMotion],
  );


  /* -------------------------------------------------------
     NEXT / PREV
  ------------------------------------------------------- */

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo],
  );

  const prev = useCallback(
    () =>
      goTo(
        (current - 1 + SLIDES.length) % SLIDES.length,
      ),
    [current, goTo],
  );


  /* -------------------------------------------------------
     AUTOPLAY
  ------------------------------------------------------- */

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);


  /* -------------------------------------------------------
     CLEANUP ON UNMOUNT
  ------------------------------------------------------- */

  useEffect(() => clearTimers, [clearTimers]);


  /* -------------------------------------------------------
     DERIVED
  ------------------------------------------------------- */

  const slide = SLIDES[current];

  const incoming =
    pending !== null ? SLIDES[pending] : null;


  /* -------------------------------------------------------
     JSX
  ------------------------------------------------------- */

  return (
    <div className="disc-hero">

      {/* ====================================================
          FULL-BLEED BACKGROUND
      ==================================================== */}

      <div className="disc-hero__bg">

        <img
          key={current}
          src={slide.img}
          alt=""
          className={
            "disc-hero__bg-img" +
            (spinning ? "" : " disc-hero__bg-img--idle")
          }
        />

        <div className="disc-hero__overlay-lr" />

        <div className="disc-hero__overlay-bt" />

      </div>


      {/* ====================================================
          CONCENTRIC DECORATIVE RINGS
      ==================================================== */}

      <div className="disc-hero__rings">

        {RING_SIZES.map((size) => (
          <div
            key={size}
            className="disc-hero__ring"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
            }}
          />
        ))}

      </div>


      {/* ====================================================
          ROTATING PINWHEEL DISC

          Only rendered while a spin is in progress.
          Shows the INCOMING image inside the faceted shape.
          The full background swaps at the 50% mark, so the
          cut is masked by the busiest part of the spin.

          When the spin ends at 360°, it unmounts cleanly.
      ==================================================== */}

      {spinning && incoming && (
        <div
          key={spinKey}
          className={
            "disc-hero__disc disc-hero__disc--spinning"
          }
          style={{
            clipPath,
            WebkitClipPath: clipPath,
            ["--spin-duration" as string]: `${TOTAL_MS}ms`,
          }}
        >

          <img
            src={incoming.img}
            alt=""
            className="disc-hero__disc-img"
          />

        </div>
      )}


      {/* ====================================================
          TOP NAV
      ==================================================== */}

      <div className="disc-hero__nav">

        <Menu size={16} strokeWidth={1.5} />

        <span className="disc-hero__nav-brand">
          GLOBETROTTER
        </span>

        <div className="disc-hero__nav-right">

          <span className="disc-hero__nav-link">
            SEE ALL DESTINATIONS
          </span>

          <Search size={16} strokeWidth={1.5} />

        </div>

      </div>


      {/* ====================================================
          TITLE BLOCK
      ==================================================== */}

      <div
        className={
          "disc-hero__title-block" +
          (textVisible
            ? ""
            : " disc-hero__title-block--hidden")
        }
      >

        <h1 className="disc-hero__title">
          {slide.title}
        </h1>

        <p className="disc-hero__place">
          {slide.place}
        </p>

      </div>


      {/* ====================================================
          BOTTOM-LEFT INDEX
      ==================================================== */}

      <div className="disc-hero__index">

        <span className="disc-hero__index-divider" />

        <span>
          0{current + 1}{" "}
          <span className="disc-hero__index-total">
            / 0{SLIDES.length}
          </span>
        </span>

      </div>


      {/* ====================================================
          BOTTOM-RIGHT CONTROLS
      ==================================================== */}

      <div className="disc-hero__controls">

        <button
          onClick={prev}
          aria-label="Previous destination"
          className="disc-hero__btn disc-hero__btn--prev"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={next}
          aria-label="Next destination"
          className="disc-hero__btn disc-hero__btn--next"
        >
          <ArrowRight size={16} />
        </button>

      </div>

    </div>
  );
}
