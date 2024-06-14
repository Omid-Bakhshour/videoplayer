import { PLAY_BACK_RATE_LIST } from '@/constants/controls'
import { VideoRefType } from '@/models/player'
import React, { useEffect, useState } from 'react'
import SpeedIcon from '@/icons/speed.svg'

const SPEED_LOCAL_NAME = "playerSpeed"

function PlayBackRate({ videoRef }: VideoRefType) {
    const [playback, setPlayback] = useState<number>(1);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const savedSpeed = localStorage.getItem(SPEED_LOCAL_NAME);
          const initialSpeedValue = savedSpeed ? JSON.parse(savedSpeed) : 1
          setPlayback(initialSpeedValue);
        }
      }, []);

    const handleSpeedChange = (value: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = value;
            setPlayback(value)
            localStorage?.setItem(SPEED_LOCAL_NAME, JSON.stringify(value));
        }
    };

    return (
        <div className='dropdown lg:dropdown-top dropdown-end' >
              <div tabIndex={0}  className=" cursor-pointer">
                <SpeedIcon/>
              </div>
              <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2 ' >
                {
                    PLAY_BACK_RATE_LIST.map((item) => {
                        const isActive = item.value === playback
                        return (
                            <li className={`${isActive ? "bg-slate-100 rounded-md" : ""} cursor-pointer`}  
                             onClick={() => handleSpeedChange(item.value)} 
                            >
                              <a>{item.label}</a>
                            </li>
                        )
                    })
                }
              </ul>
        </div>

    )
}

export default PlayBackRate