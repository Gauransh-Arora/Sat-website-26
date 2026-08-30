import { useState, useRef } from 'react';
import videoSrc from '../assets/video.mp4';
import './VideoLoader.css';

export default function VideoLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Start fading out when 0.5 seconds or less are remaining
      if (duration && duration - currentTime <= 0.5 && !fading) {
        setFading(true);
        setTimeout(() => setHidden(true), 500);
      }
    }
  };

  const handleEnded = () => {
    if (!fading) {
      setFading(true);
      setTimeout(() => setHidden(true), 500);
    }
  };

  if (hidden) return null;

  return (
    <div className={`video-loader-container ${fading ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="video-element"
      />
    </div>
  );
}
