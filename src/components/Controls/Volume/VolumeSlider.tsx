import React, { useRef, useEffect, Dispatch } from 'react';
import { VideoRefType, VolumeStateType } from '@/models/player';
import { throttle } from 'lodash';

type PropsType = {
  value: VolumeStateType
  setValue: Dispatch<VolumeStateType>
} & VideoRefType


const VolumeSlider: React.FC<PropsType> = ({
   videoRef,
   value,
   setValue,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = value.volume;
    }
  }, [videoRef, value]);

  const updateVolume = (clientX: number) => {
    if (sliderRef.current && videoRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const sliderLeft = sliderRef.current.getBoundingClientRect().left;
      const clickPosition = clientX - sliderLeft;
      const newVolume = Math.min(Math.max(clickPosition / sliderWidth, 0), 1);

      videoRef.current.volume = newVolume;
      const isMuted = newVolume === 0 ? true  : false

      setValue({
        volume: newVolume,
        isMuted: isMuted
      });
      localStorage.setItem('volume', JSON.stringify(newVolume));
      localStorage.setItem('isMuted', JSON.stringify(isMuted));
    }
  };

  const throttledUpdateVolume = throttle(updateVolume, 50);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateVolume(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current) {
      throttledUpdateVolume(event.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateVolume(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isDragging.current) {
      throttledUpdateVolume(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className='relative'>
      <div
        className='w-[100px] h-[6px] relative cursor-pointer'
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        ref={sliderRef}
      >
        <div className='w-full h-full block rounded-full bg-slate-600' />
        {/* Progress */}
        <div
          className='h-full rounded-full absolute z-[1] left-0 top-0 bottom-0 bg-white'
          style={{ width: `${value.volume * 100}%` }}
        >
          {/* Circle */}
          <div className='absolute w-4 h-4 block rounded-full -right-2 -top-1 z-[2] bg-white' />
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
