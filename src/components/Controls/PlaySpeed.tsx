import { PLAYER_SPEED_LIST } from '@/constants/controls'
import { VideoRefType } from '@/models/player'
import React, { useEffect, useState } from 'react'

const SPEED_LOCAL_NAME = "playerSpeed"

function PlaySpeed({ videoRef }: VideoRefType) {
    const [speed, setSpeed] = useState<number>(1);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const savedSpeed = localStorage.getItem(SPEED_LOCAL_NAME);
          const initialSpeedValue = savedSpeed ? JSON.parse(savedSpeed) : 1
          setSpeed(initialSpeedValue);
        }
      }, []);

    const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (videoRef.current) {
            const speedValue = parseFloat(event.target.value)
            videoRef.current.playbackRate = speedValue;
            setSpeed(speedValue)
            localStorage?.setItem(SPEED_LOCAL_NAME, JSON.stringify(speedValue));
        }
    };

    return (
        <select value={speed} id="playbackRate" onChange={handleSpeedChange}>
            {
                PLAYER_SPEED_LIST.map((speedItem) => {
                    return (
                        <option value={speedItem.value} >{speedItem.label}</option>
                    )
                })
            }
        </select>
    )
}

export default PlaySpeed