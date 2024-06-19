import React, { useEffect, Dispatch } from 'react';
import { VideoRefType, VolumeStateType } from '@/models/player';
import MuteIcon from '@/icons/volume_mute_fill.svg';
import VolumeIcon from '@/icons/volume_fill.svg';
import { toggleMute } from '@/utils/player';

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

  return (
    <div className='cursor-pointer' onClick={() => toggleMute(videoRef, setValue)}>
      {value.isMuted ? <MuteIcon /> : <VolumeIcon />}
    </div>
  );
};

export default Mute;
