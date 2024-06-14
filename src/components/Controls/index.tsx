import React, { MutableRefObject } from 'react'
import PlayPause from './PlayPause'
import Volume from './Volume';
import Duration from './Duration';
import TimeSlider from './TimeSlider';
import useDuration from '@/hooks/useDuration';
import PlayBackRate from './PlayBackRate';
import QualityList from './QualityList';
import Hls from 'hls.js';

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>;
    hls: MutableRefObject<Hls | null>
}

function Controls({ videoRef, hls, ...props }: Props) {
    const {
        currentTime,
        duration,
        setCurrentTime,
    } = useDuration(videoRef)

    const qualities = (props as any).qualities ? (props as any).qualities : [];

    return (
        <div className='absolute z-[1] bottom-0 left-0 right-0 w-full flex flex-col gap-4 p-4' >
            {/* timeSlider */}
            <div className='w-full relatice' >
                <TimeSlider
                    videoRef={videoRef}
                    currentTime={currentTime}
                    duration={duration}
                    setCurrentTime={setCurrentTime}
                />
            </div>
            {/* buttons */}
            <div className='w-full flex flex-row gap items-center gap-2' >
                {/* left buttons */}
                <div className='flex felx-row gap-2 md:gap-4 items-center' >
                    {/* play pause */}
                    <PlayPause videoRef={videoRef} />
                    {/* volume */}
                    <Volume videoRef={videoRef} />
                    {/* duration */}
                    <Duration
                        currentTime={currentTime}
                        duration={duration}
                    />
                </div>
                {/* space */}
                <div className='hidden w-full md:block flex-1' />
                {/* right buttons */}
                <div className='flex items-center gap-2 md:gap-4' >
                    {/* captions list */}
                    {/* play back rate */}
                    <PlayBackRate videoRef={videoRef} />
                    {/* quality select list */}
                    <QualityList
                        qualities={qualities}
                        hls={hls}
                    />
                    {/* mini player */}
                    {/* theather mode */}
                    {/* fullscreen */}
                </div>
            </div>
        </div>
    )
}

export default Controls