import React, { useRef, useEffect, Dispatch, useState } from 'react';
import { VideoRefType } from '@/models/player';
import { throttle } from 'lodash';

type PropsType = VideoRefType;

const TimeSlider: React.FC<PropsType> = ({ videoRef }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const duration = videoRef.current?.duration || 0



    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleTimeUpdate = () => {
                setCurrentTime(videoElement.currentTime);
            };

            videoElement.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [videoRef]);


    return (
        <div className='relative'>
            <div
                className='w-full h-[6px] relative cursor-pointer'

                ref={sliderRef}
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
