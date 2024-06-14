import { initialPlayerOption } from '@/constants/controls';
import { PlayerOptionType } from '@/models/player';
import React, { useEffect, useState } from 'react'

const usePlayer = (videoRef: React.RefObject<HTMLVideoElement>) => {
    const [playerOption, setPlayerOption] = useState<PlayerOptionType>(initialPlayerOption)

    useEffect(() => {
        const videoElement = videoRef.current;
    
        if (videoElement) {
          const handleTimeUpdate = () => {
            setPlayerOption(prev => ({
              ...prev,
              currentTime: videoElement.currentTime,
            }));
          };
    
          const handleLoadedMetadata = () => {
            setPlayerOption(prev => ({
              ...prev,
              duration: videoElement.duration,
            }));
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
        playerOption,
        setPlayerOption,
      }
 
}

export default usePlayer