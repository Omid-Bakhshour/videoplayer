import React, { useRef, useEffect, useState} from 'react';
import { ControlPropsType} from '@/models/player';
import { throttle } from 'lodash';


const TimeSlider: React.FC<ControlPropsType> = ({
  videoRef,
  value,
  setValue,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const wasPlaying = useRef<boolean>(false);
  const [bufferedTime, setBufferedTime] = useState<number>(0);
  const duration = value?.duration
  const currentTime = value?.currentTime

  const updateBufferedTime = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const buffered = videoElement.buffered;
      if (buffered.length > 0) {
        setBufferedTime(buffered.end(buffered.length - 1));
      }
    }
  };

  const updateCurrentTime = (clientX: number) => {
    if (sliderRef.current && videoRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const sliderLeft = sliderRef.current.getBoundingClientRect().left;
      const clickPosition = clientX - sliderLeft;
      const newTime = Math.min(Math.max((clickPosition / sliderWidth) * duration, 0), duration);
      setValue({
        currentTime: newTime
      });
      videoRef.current.currentTime = newTime;
    }
  };

  const throttledUpdateCurrentTime = throttle(updateCurrentTime, 50);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (videoRef.current && !videoRef.current.paused) {
      wasPlaying.current = true;
      videoRef.current.pause();
    } else {
      wasPlaying.current = false;
    }
    isDragging.current = true;
    updateCurrentTime(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    if (isDragging.current) {
      throttledUpdateCurrentTime(event.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        if (wasPlaying.current) {
          videoRef.current.play();
        }
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (videoRef.current && !videoRef.current.paused) {
      wasPlaying.current = true;
      videoRef.current.pause();
    } else {
      wasPlaying.current = false;
    }
    isDragging.current = true;
    updateCurrentTime(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isDragging.current) {
      event.preventDefault();
      throttledUpdateCurrentTime(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        if (wasPlaying.current) {
          videoRef.current.play();
        }
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      updateBufferedTime();
      videoElement.addEventListener('progress', updateBufferedTime);

      return () => {
        videoElement.removeEventListener('progress', updateBufferedTime);
      };
    }
  }, [videoRef]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentTime]);

  return (
    <div className='relative'>
      <div
        className='w-full h-[6px] relative cursor-pointer'
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => updateCurrentTime(e.clientX)}
        onTouchStart={handleTouchStart}
      >
        <div className='w-full h-full block rounded-full bg-slate-600' />
        {/* Buffered progress */}
        <div
          className='h-full rounded-full absolute z-[1] left-0 top-0 bottom-0 bg-gray-400'
          style={{ width: `${(bufferedTime / duration) * 100}%` }}
        />
        {/* Current progress */}
        <div
          className='h-full rounded-full absolute z-[2] left-0 top-0 bottom-0 bg-white'
          style={{ width: `${(currentTime / duration) * 100}%` }}
        >
          {/* Circle */}
          <div className='absolute w-4 h-4 block rounded-full -right-2 -top-1 z-[3] bg-white' />
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
