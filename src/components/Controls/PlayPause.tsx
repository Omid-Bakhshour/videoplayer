import React, { useState, useEffect } from 'react';
import PlayIcon from '@/icons/play_fill.svg';
import PauseIcon from '@/icons/pause_fill.svg';
import { VideoRefType } from '@/models/player';

function PlayPause({ videoRef }: VideoRefType) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true)
    }

    const handlePause = () => {
        setIsPlaying(false)
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
