import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cloudImg from '../assets/lib_cloud_img.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Scale the image slightly up to allow for parallax travel without revealing edges
      // We use a safe translation limit (8%) to ensure no subpixel gaps appear
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.71,
          yPercent: 8,
        },
        {
          scale: 1.71,
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="image-transition"
      style={{
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        display: 'block',
        border: 'none',
        lineHeight: 0,
      }}
    >
      <img
        ref={imageRef}
        src={cloudImg}
        alt="Cloud Transition"
        style={{
          height: '100vh',
          width: '100vw',
          objectFit: 'cover',
          objectPosition: 'center',
          margin: 0,
          padding: 0,
          display: 'block',
          border: 'none',
          willChange: 'transform'
        }}
      />
    </section>
  );
}
