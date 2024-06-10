import React from 'react'
import PlayPause from './PlayPause'
import Volume from './Volume';
import Duration from './Duration';
import TimeSlider from './TimeSlider';
import useDuration from '@/hooks/useDuration';

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>;
}

function Controls({videoRef}: Props) {
    const {
        currentTime,
        duration,
        setCurrentTime,
    } = useDuration(videoRef)

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
                {/* play && volume && duration */}
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

                <div className='flex items-center gap-2 md:gap-4' >
                    {/* captions list */}
                    {/* quality select list */}
                    {/* theather mode */}
                    {/* fullscreen */}
                </div>
            </div>
        </div>
    )
}

export default Controls