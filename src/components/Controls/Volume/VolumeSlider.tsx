import { VideoRefType } from '@/models/player'
import React from 'react'

function VolumeSlider({ videoRef }: VideoRefType) {
    return (
        <div className='relative'>
            <div className='w-[100px] h-[6px] relative' >
                {/* initial background */}
                <div className='w-full h-full block rounded-full bg-slate-600' />
                {/* progress */}
                <div className='w-2/6 h-full rounded-full absolute z-[1] left-0 top-0 bottom-0 bg-white ' >
                    {/* circle */}
                    <div className='absolute w-4 h-4 block rounded-full -right-2 -top-1 z-[2] bg-white'  />
                </div>
            </div>
        </div>
    )
}

export default VolumeSlider