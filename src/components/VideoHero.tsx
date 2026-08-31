import { useState, useRef } from 'react';
import satwebVideo from '../assets/satweb.mp4';
import TranslucentNavbar from './TranslucentNavbar.tsx';

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsEnded(false);
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
      <TranslucentNavbar />

      <video
        ref={videoRef}
        src={satwebVideo}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={false}
        onEnded={handleEnded}
      />

      {(!isPlaying || isEnded) && (
        <div className={`absolute inset-0 flex justify-center z-10 transition-all duration-500 ${isEnded ? 'items-center bg-black/40 backdrop-blur-sm' : 'items-start pt-[75vh]'}`}>
          {!isEnded ? (
            <button
              onClick={handlePlay}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border-2 border-[#0D1A3E] rounded-full text-[#0D1A3E] text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              Begin
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white text-xl sm:text-2xl font-light tracking-[0.3em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
