import React from 'react'
import Mute from './Mute';
import { VideoRefType } from '@/models/player';

function Volume({videoRef}: VideoRefType) {
  return (
    <div className='flex items-center gap-3'>
        {/* mute */}
        <Mute videoRef={videoRef} />
        {/* volume slider*/}
    </div>
  )
}

export default Volume