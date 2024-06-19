import React from 'react'
import FullScreenIcon from '@/icons/fullscreen_fill.svg'
import FullScreenExitIcon from '@/icons/fullscreen_exit_fill.svg'
import { SetValuePartialType } from '@/models/player'
import { toggleFullScreenMode } from '@/utils/player'

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} 


function FullScreenMode({
    value,
    setValue,
}: Props) {
    return (
        <div
            onClick={() => toggleFullScreenMode(value, setValue)}
            className='cursor-pointer'
        >
          {
            value ? <FullScreenExitIcon /> : <FullScreenIcon />
          }  
        </div>
    )
}

export default FullScreenMode