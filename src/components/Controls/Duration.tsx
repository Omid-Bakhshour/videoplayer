import { VideoRefType } from '@/models/player'
import React, { useEffect, useState } from 'react'

type Props = VideoRefType

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

function Duration({ videoRef }: Props) {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const videoElement = videoRef.current;
    
        if (videoElement) {
          const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
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

    return (
        <span className='text-[14px] text-white flex gap-1' >
            {/* currenttime */}
            <span className='' >{formatTime(currentTime)}</span>
            <span className='shrink-0' >/</span>
            <span className='' >{formatTime(duration)}</span>
        </span>
    )
}

export default Duration