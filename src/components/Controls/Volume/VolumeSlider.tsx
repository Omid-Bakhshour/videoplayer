import React, { useState, useRef, useEffect } from 'react';
import { VideoRefType } from '@/models/player';

const VolumeSlider: React.FC<VideoRefType> = ({ videoRef }) => {
  const [volume, setVolume] = useState<number>(1);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('volume');
      setVolume(savedVolume ? JSON.parse(savedVolume) : 1);
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = volume;
    }
  }, [videoRef, volume]);

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current && videoRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const clickPosition = event.nativeEvent.offsetX;
      const newVolume = clickPosition / sliderWidth;

      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      localStorage?.setItem('volume', JSON.stringify(newVolume));
    }
  };

  return (
    <div className='relative'>
      <div
        className='w-[100px] h-[6px] relative cursor-pointer'
        onClick={handleSliderClick}
        ref={sliderRef}
      >
        {/* Initial background */}
        <div className='w-full h-full block rounded-full bg-slate-600' />
        {/* Progress */}
        <div
          className='h-full rounded-full absolute z-[1] left-0 top-0 bottom-0 bg-white'
          style={{ width: `${volume * 100}%` }}
        >
          {/* Circle */}
          <div className='absolute w-4 h-4 block rounded-full -right-2 -top-1 z-[2] bg-white' />
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
