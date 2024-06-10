

import React, { useEffect, useState } from 'react'

const  useDuration = (videoRef: React.RefObject<HTMLVideoElement>) => {
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


      return {
        currentTime,
        setCurrentTime,
        duration,
        setDuration
      }
 
}

export default useDuration