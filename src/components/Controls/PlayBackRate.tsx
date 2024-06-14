import { PLAY_BACK_RATE_LIST } from '@/constants/controls'
import { SetValuePartialType, VideoRefType } from '@/models/player'
import React, { useEffect } from 'react'
import SpeedIcon from '@/icons/speed.svg'

const SPEED_LOCAL_NAME = "playerSpeed"

type Props = {
  value: number,
  setValue: SetValuePartialType
} & VideoRefType


function PlayBackRate({
  videoRef,
  value,
  setValue
}: Props) {

  const onValueChangeHandler = (value: number) => {
    setValue({
      playbackRate: value
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSpeed = localStorage.getItem(SPEED_LOCAL_NAME);
      const initialSpeedValue = savedSpeed ? JSON.parse(savedSpeed) : 1
      onValueChangeHandler(initialSpeedValue);
    }
  }, []);

  const handleSpeedChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = value;
      onValueChangeHandler(value)
      localStorage?.setItem(SPEED_LOCAL_NAME, JSON.stringify(value));
    }
  };

  return (
    <div className='dropdown lg:dropdown-top dropdown-end' >
      <div title='speed' tabIndex={0} className=" cursor-pointer">
        <SpeedIcon />
      </div>
      <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2 ' >
        {
          PLAY_BACK_RATE_LIST.map((item) => {
            const isActive = item.value === value
            return (
              <li key={item.value}
                onClick={() => handleSpeedChange(item.value)}
              >
                <a
                  className={`${isActive ? "active" : ""}`}
                >{item.label}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PlayBackRate