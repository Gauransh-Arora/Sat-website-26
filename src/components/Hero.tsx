import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Menu, Search, ChevronLeft, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Data (swap image URLs for real assets later)
// ---------------------------------------------------------------------------
const SLIDES = [
  {
    title: "HIGHLANDS",
    place: "SCOTLAND",
    img: "https://picsum.photos/id/28/1600/1200",
  },
  {
    title: "SAHARA",
    place: "MOROCCO",
    img: "https://picsum.photos/id/29/1600/1200",
  },
  {
    title: "DOLOMITES",
    place: "ITALY",
    img: "https://picsum.photos/id/37/1600/1200",
  },
  {
    title: "MALDIVES",
    place: "INDIAN OCEAN",
    img: "https://picsum.photos/id/42/1600/1200",
  },
];

const TOTAL_MS = 900; // full spin duration
const HALF_MS = TOTAL_MS / 2; // moment the image swaps underneath the disc
const AUTOPLAY_MS = 5000;

// Build a jagged, low-poly "pinwheel" clip-path so the rotating disc reads
// as faceted shards rather than a plain circle.
function starClipPath(spikes = 9, outerR = 50, innerR = 30) {
  const pts = [];
  const step = Math.PI / spikes;
  let angle = -Math.PI / 2;
  for (let i = 0; i < spikes; i++) {
    pts.push(
      `${(50 + Math.cos(angle) * outerR).toFixed(2)}% ${(50 + Math.sin(angle) * outerR).toFixed(2)}%`
    );
    angle += step;
    pts.push(
      `${(50 + Math.cos(angle) * innerR).toFixed(2)}% ${(50 + Math.sin(angle) * innerR).toFixed(2)}%`
    );
    angle += step;
  }
  return `polygon(${pts.join(",")})`;
}

export default function DestinationHero() {
  const [current, setCurrent] = useState(0);
  const [pending, setPending] = useState(null); // index mid-transition
  const [spinning, setSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const timers = useRef<any[]>([]);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const clipPath = useMemo(() => starClipPath(), []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const goTo = useCallback(
    (index: number) => {
      if (spinning || index === current) return;

      if (prefersReducedMotion) {
        setCurrent(index);
        return;
      }

      setSpinning(true);
      setPending(index);
      setTextVisible(false);
      setSpinKey((k) => k + 1);

      timers.current.push(
        setTimeout(() => setCurrent(index), HALF_MS), // swap background mid-spin
        setTimeout(() => {
          setSpinning(false);
          setPending(null);
          setTextVisible(true);
        }, TOTAL_MS)
      );
    },
    [current, spinning, prefersReducedMotion]
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo]
  );

  // autoplay
  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => clearTimers, []);

  const slide = SLIDES[current];
  const incoming = pending !== null ? SLIDES[pending] : null;

  return (
    <div
      style={{ aspectRatio: "4 / 3", maxHeight: "640px" }}
      className="relative w-full overflow-hidden bg-black text-white select-none"
    >
      {/* background photo */}
      <div className="absolute inset-0">
        <img
          key={current}
          src={slide.img}
          alt=""
          className="h-full w-full object-cover"
          style={{
            animation: spinning
              ? "none"
              : "heroZoom 9s ease-in-out infinite alternate",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* static decorative concentric rings, anchored where the disc spins */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "20%", top: "50%", transform: "translate(-50%,-50%)" }}
      >
        {[420, 320, 220].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/15"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
            }}
          />
        ))}
      </div>

      {/* rotating faceted transition disc */}
      {spinning && incoming && (
        <div
          key={spinKey}
          className="absolute overflow-hidden"
          style={{
            left: "20%",
            top: "50%",
            width: 300,
            height: 300,
            transform: "translate(-50%,-50%)",
            clipPath,
            WebkitClipPath: clipPath,
            animation: `discSpin ${TOTAL_MS}ms linear forwards`,
          }}
        >
          <img
            src={incoming.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(1.05)" }}
          />
          {/* disc always shows the incoming image; the full background swaps
              underneath it at the same 50% mark, so the cut is masked by
              the busiest part of the spin */}
        </div>
      )}

      {/* top nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 text-[11px] tracking-[0.2em] text-white/80">
        <Menu size={16} strokeWidth={1.5} />
        <span className="font-medium tracking-[0.35em]">GLOBETROTTER</span>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">SEE ALL DESTINATIONS</span>
          <Search size={16} strokeWidth={1.5} />
        </div>
      </div>

      {/* title block */}
      <div
        className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 transition-all duration-500"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: `translateY(-50%) translateX(${textVisible ? 0 : -12}px)`,
        }}
      >
        <h1 className="text-4xl sm:text-6xl font-light tracking-[0.35em] uppercase">
          {slide.title}
        </h1>
        <p className="mt-3 text-xs sm:text-sm tracking-[0.4em] text-white/70">
          {slide.place}
        </p>
      </div>

      {/* bottom-left index */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[11px] tracking-widest text-white/70">
        <span className="h-4 w-px bg-white/40" />
        <span>
          0{current + 1} <span className="text-white/40">/ 0{SLIDES.length}</span>
        </span>
      </div>

      {/* bottom-right controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous destination"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          aria-label="Next destination"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-black hover:bg-amber-300 transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes discSpin {
          from { transform: translate(-50%,-50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%,-50%) rotate(180deg) scale(1.04); }
          to { transform: translate(-50%,-50%) rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
}