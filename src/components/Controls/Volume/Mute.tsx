import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { VideoRefType, VolumeStateType } from '@/models/player';
import MuteIcon from '@/icons/volume_mute_fill.svg';
import VolumeIcon from '@/icons/volume_fill.svg';

type PropsType = {
  value: VolumeStateType
  setValue: Dispatch<VolumeStateType>
} & VideoRefType

const Mute: React.FC<PropsType> = ({
   videoRef,
   value,
   setValue
}) => {

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = value.isMuted;
    }
  }, [videoRef, value]);

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const savedVolume = localStorage.getItem('volume');
      const newMutedState = !videoElement.muted;
      videoElement.muted = newMutedState;

      setValue({
        isMuted: newMutedState,
        volume: newMutedState === true ? 0 : savedVolume ? JSON.parse(savedVolume) : 0
      });
      
      localStorage?.setItem('isMuted', JSON.stringify(newMutedState));
    }
  };

  return (
    <div className='cursor-pointer' onClick={toggleMute}>
      {value.isMuted ? <MuteIcon /> : <VolumeIcon />}
    </div>
  );
};

export default Mute;
