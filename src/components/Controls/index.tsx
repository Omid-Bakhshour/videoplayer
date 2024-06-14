import React, { MutableRefObject } from 'react'
import PlayPause from './PlayPause'
import Volume from './Volume';
import Duration from './Duration';
import TimeSlider from './TimeSlider';
import PlayBackRate from './PlayBackRate';
import QualityList from './QualityList';
import Hls from 'hls.js';
import usePlayer from '@/hooks/usePlayer';
import { initialPlayerOption } from '@/constants/controls';
import { PlayerOptionsObjectType } from '@/models/player';

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>;
    hls: MutableRefObject<Hls | null>
}

function Controls({ videoRef, hls, ...props }: Props) {
    const {
        playerOption,
        setPlayerOption,
    } = usePlayer(videoRef)

    const qualities = (props as any).qualities ? (props as any).qualities : [];

    const onSetOptionsChangeHandler = (object: PlayerOptionsObjectType) => {
        setPlayerOption(prev => ({
            ...prev,
            ...object
        }))

    }

    return (
        <div className='absolute z-[1] bottom-0 left-0 right-0 w-full flex flex-col gap-4 p-4' >
            {/* timeSlider */}
            <div className='w-full relatice' >
                <TimeSlider
                    videoRef={videoRef}
                    value={playerOption}
                    setValue={onSetOptionsChangeHandler}
                />
            </div>
            {/* buttons */}
            <div className='w-full flex flex-row gap items-center gap-2' >
                {/* left buttons */}
                <div className='flex felx-row gap-2 md:gap-4 items-center' >
                    {/* play pause */}
                    <PlayPause 
                        videoRef={videoRef}
                        value={playerOption.isPlaying || false}
                        setValue={onSetOptionsChangeHandler}

                    />
                    {/* volume */}
                    <Volume 
                        videoRef={videoRef}
                        value={playerOption}
                        setValue={onSetOptionsChangeHandler}
                    />
                    {/* duration */}
                    <Duration
                        currentTime={playerOption?.currentTime}
                        duration={playerOption?.duration}
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
                        value={playerOption?.quality || initialPlayerOption.quality}
                        setValue={(value: number) => {
                            setPlayerOption(prev => ({
                                ...prev,
                                quality: value
                            }))
                        }}
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