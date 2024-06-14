import React, { useEffect } from 'react';
import PlayIcon from '@/icons/play_fill.svg';
import PauseIcon from '@/icons/pause_fill.svg';
import { SetValuePartialType, VideoRefType } from '@/models/player';

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} & VideoRefType

function PlayPause({ 
    videoRef,
    value,
    setValue,

 }: Props) {
    const isPlaying = value
    
    const handlePlay = () => {
        setValue({
            isPlaying: true
        })
    }

    const handlePause = () => {
        setValue({
            isPlaying: false
        })    
    }

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);

            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
            };
        }
    }, [videoRef]);

    const togglePlayPause = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (videoElement.paused || videoElement.ended) {
                videoElement?.play();
            } else {
                videoElement?.pause();
            }
        }
    };

    return (
        <div className='cursor-pointer' onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
    );
};

export default PlayPause;
