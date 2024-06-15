import { VideoRefType } from '@/models/player'
import React, { useEffect, useState } from 'react'

type Props = {
  duration: number
  currentTime: number
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

function Duration({ duration, currentTime }: Props) {

    return (
        <span className='hidden md:flex text-[14px] text-white  gap-1' >
            {/* currenttime */}
            <span className='' >{formatTime(currentTime)}</span>
            <span className='shrink-0' >/</span>
            <span className='' >{formatTime(duration)}</span>
        </span>
    )
}

export default Duration