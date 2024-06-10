import React, { useEffect, useState } from 'react'
import Mute from './Mute';
import { VideoRefType, VolumeStateType } from '@/models/player';
import VolumeSlider from './VolumeSlider';

const initialState = {
  isMuted: false,
  volume: 0
}

function Volume({videoRef}: VideoRefType) {
  const [volume, setVolume] = useState<VolumeStateType>(initialState)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMutedState = localStorage.getItem('isMuted');
      const savedVolume = localStorage.getItem('volume');
      const isMuted = savedMutedState ? JSON.parse(savedMutedState) : false

      setVolume({
        isMuted: isMuted ,
        volume: isMuted == true ? 0 : savedVolume ? JSON.parse(savedVolume) : 1
      });
    }
  }, []);

  return (
    <div className='flex items-center gap-4'>
        {/* mute */}
        <Mute 
           videoRef={videoRef}
           value={volume}
           setValue ={setVolume}
        />
        {/* volume slider*/}
        <VolumeSlider 
           videoRef={videoRef}
           value={volume}
           setValue ={setVolume}
        />
    </div>
  )
}

export default Volume