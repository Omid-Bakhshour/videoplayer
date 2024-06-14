import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Mute from './Mute';
import { PlayerOptionType, VideoRefType } from '@/models/player';
import VolumeSlider from './VolumeSlider';

type Props = {
  playerOptions: PlayerOptionType
  setPlayerOptions: Dispatch<SetStateAction<any>>
} & VideoRefType


function Volume({
  videoRef,
  playerOptions,
  setPlayerOptions
}: Props) {
  const initialVolume = {
    isMuted: playerOptions.isMuted,
    volume: playerOptions.volume
  }

  const onVolumeChangeHandler = (volumeObject: {isMuted: boolean , volume: number}) => {
    setPlayerOptions((prev: PlayerOptionType)=> ({
      ...prev,
      ...volumeObject
    }));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMutedState = localStorage.getItem('isMuted');
      const savedVolume = localStorage.getItem('volume');
      const isMuted = savedMutedState ? JSON.parse(savedMutedState) : false

      onVolumeChangeHandler({
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
           setValue ={onVolumeChangeHandler}
        />
        {/* volume slider*/}
        <VolumeSlider 
           videoRef={videoRef}
           value={initialVolume}
           setValue ={onVolumeChangeHandler}
        />
    </div>
  )
}

export default Volume