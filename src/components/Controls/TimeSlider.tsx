import React, { useRef, useEffect, useState, SetStateAction, Dispatch } from 'react';
import { VideoRefType } from '@/models/player';
import { throttle } from 'lodash';

type PropsType = {
    duration :number,
    currentTime: number,
    setCurrentTime: Dispatch<SetStateAction<number>>,
} & VideoRefType;

const TimeSlider: React.FC<PropsType> = ({
    videoRef,
    currentTime,
    duration,
    setCurrentTime,
}) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef<boolean>(false);


    const updateCurrentTime = (e: MouseEvent | React.MouseEvent) => {
        if (sliderRef.current && videoRef.current) {
            const clientX = e.clientX
            const sliderWidth = sliderRef.current.offsetWidth;
            const sliderLeft = sliderRef.current.getBoundingClientRect().left;
            const clickPosition = clientX - sliderLeft;
            const newTime = Math.min(Math.max((clickPosition / sliderWidth) * duration, 0), duration);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      isDragging.current = true;
      updateCurrentTime(event);
    };
  
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current) {
        updateCurrentTime(event);
      }
    };
  
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, []);

    return (
        <div className='relative'>
            <div
                className='w-full h-[6px] relative cursor-pointer'
                ref={sliderRef}
                onMouseDown={handleMouseDown}
            >
                <div className='w-full h-full block rounded-full bg-slate-600' />
                {/* Progress */}
                <div
                    className='h-full rounded-full absolute z-[1] left-0 top-0 bottom-0 bg-white'
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                    {/* Circle */}
                    <div className='absolute w-4 h-4 block rounded-full -right-2 -top-1 z-[2] bg-white' />
                </div>
            </div>
        </div>
    );
};

export default TimeSlider;
