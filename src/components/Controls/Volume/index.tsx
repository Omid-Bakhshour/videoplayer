import React, { useEffect } from 'react'
import Mute from './Mute';
import { ControlPropsType } from '@/models/player';
import VolumeSlider from './VolumeSlider';

function Volume({
  videoRef,
  value,
  setValue
}: ControlPropsType) {
  const initialVolume = {
    isMuted: value.isMuted,
    volume: value?.volume || 1
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMutedState = localStorage.getItem('isMuted');
      const savedVolume = localStorage.getItem('volume');
      const isMuted = savedMutedState ? JSON.parse(savedMutedState) : false

      setValue({
        isMuted: isMuted ,
        volume: isMuted == true ? 0 : savedVolume ? JSON.parse(savedVolume) : 1
      })
    }
  }, []);

  return (
    <div className='flex items-center gap-4'>
        {/* mute */}
        <Mute 
           videoRef={videoRef}
           value={initialVolume}
           setValue ={setValue}
        />
        {/* volume slider*/}
        <VolumeSlider 
           videoRef={videoRef}
           value={initialVolume}
           setValue ={setValue}
        />
    </div>
  )
}

export default Volume