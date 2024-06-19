import { initialPlayerOption } from '@/constants/controls';
import { PlayerOptionType, PlayerOptionsObjectType } from '@/models/player';
import { toggleFullScreenMode, toggleMute, togglePlayPause, toggleTheatreMode } from '@/utils/player';
import React, { useEffect, useState } from 'react'

const usePlayer = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [playerOption, setPlayerOption] = useState<PlayerOptionType>(initialPlayerOption)

  const onSetOptionsChangeHandler = (object: PlayerOptionsObjectType) => {
    setPlayerOption(prev => ({
      ...prev,
      ...object
    }))
  }

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
  }, [videoRef])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement) {
        const tagName = document.activeElement.tagName.toLowerCase()
        if (tagName === "input") {
          return
        }

        switch (e.key.toLocaleLowerCase()) {
          case " ":
            if (tagName === "button") {
              return
            }
          case "k":
            togglePlayPause(videoRef)
            break

          case "m":
            toggleMute(videoRef, onSetOptionsChangeHandler)
            break

          case "f":
            toggleFullScreenMode(playerOption.fullScreen, onSetOptionsChangeHandler)
            break

          case "t":
              toggleTheatreMode(playerOption.theatreMode, onSetOptionsChangeHandler)
              break  
        }
      }
    }

    const videoElement = videoRef.current;
    if (videoElement) {
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [playerOption, videoRef])

  return {
    playerOption,
    setPlayerOption,
    onSetOptionsChangeHandler
  }

}

export default usePlayer