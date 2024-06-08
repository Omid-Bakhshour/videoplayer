import React, { useState, useEffect } from 'react';
import { VideoRefType } from '@/models/player';
import MuteIcon from '@/icons/volume_mute_fill.svg';
import VolumeIcon from '@/icons/volume_fill.svg';

const Mute: React.FC<VideoRefType> = ({ videoRef }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMutedState = localStorage.getItem('isMuted');
      setIsMuted(savedMutedState ? JSON.parse(savedMutedState) : false);
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = isMuted;

      const handleVolumeChange = () => {
        if (videoElement.volume === 0) {
          setIsMuted(true);
        } else {
          setIsMuted(false);
        }
        localStorage.setItem('isMuted', JSON.stringify(videoElement.muted));
      };

      videoElement.addEventListener('volumechange', handleVolumeChange);

      return () => {
        videoElement.removeEventListener('volumechange', handleVolumeChange);
      };
    }
  }, [videoRef, isMuted]);

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const newMutedState = !videoElement.muted;
      videoElement.muted = newMutedState;
      setIsMuted(newMutedState);
      localStorage?.setItem('isMuted', JSON.stringify(newMutedState));
    }
  };

  return (
    <div className='cursor-pointer' onClick={toggleMute}>
      {isMuted ? <MuteIcon /> : <VolumeIcon />}
    </div>
  );
};

export default Mute;
