import React, { useRef, useEffect, useState } from 'react';
import { VideoRefType } from '@/models/player';
import { throttle } from 'lodash';

type PropsType = VideoRefType;

const TimeSlider: React.FC<PropsType> = ({ videoRef }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleTimeUpdate = () => {
                if (!isDraggingRef.current) {
                    setCurrentTime(videoElement.currentTime);
                }
            };

            const handleLoadedMetadata = () => {
                setDuration(videoElement.duration);
              };

            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            videoElement.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);

            };
        }
    }, [videoRef]);

    console.log(duration)

    const updateCurrentTime = (e: MouseEvent | React.MouseEvent) => {
        console.log(e.clientX)
        if (sliderRef.current) {
            const clientX = e.clientX
            const sliderWidth = sliderRef.current.offsetWidth;
            const sliderLeft = sliderRef.current.getBoundingClientRect().left;
            const clickPosition = clientX - sliderLeft;
            const newTime = Math.min(Math.max((clickPosition / sliderWidth) * duration, 0), duration);
            console.log(newTime)
            setCurrentTime(Math.min(Math.max(newTime, 0), duration));

                videoRef.current.currentTime = newTime;

            
        }
    };


    const throttledUpdateTime = throttle(updateCurrentTime, 50);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        throttledUpdateTime(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDraggingRef.current) {
            throttledUpdateTime(e);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        console.log('sds')
            isDraggingRef.current = false;
                updateCurrentTime(e)
            
    };




    useEffect(() => {
        const handleMouseUpGlobal = (e: MouseEvent) => handleMouseUp(e);
        const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);

        document.addEventListener('mouseup', handleMouseUpGlobal);
        document.addEventListener('mousemove', handleMouseMoveGlobal);

        return () => {
            document.removeEventListener('mouseup', handleMouseUpGlobal);
            document.removeEventListener('mousemove', handleMouseMoveGlobal);
        };
    }, [currentTime]);

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
