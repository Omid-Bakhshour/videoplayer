import React from 'react'
import Mute from './Mute';
import { VideoRefType } from '@/models/player';
import VolumeSlider from './VolumeSLider';

function Volume({videoRef}: VideoRefType) {
  return (
    <div className='flex items-center gap-4'>
        {/* mute */}
        <Mute videoRef={videoRef} />
        {/* volume slider*/}
        <VolumeSlider videoRef={videoRef} />
    </div>
  )
}

export default Volume