import React from 'react'
import FullScreenIcon from '@/icons/fullscreen_fill.svg'
import FullScreenExitIcon from '@/icons/fullscreen_exit_fill.svg'
import { SetValuePartialType } from '@/models/player'

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} 


function FullScreenMode({
    value,
    setValue,
}: Props) {
    const onClickHandler = () => {
        const toggleValue = !value
        setValue({
            fullScreen: toggleValue
        })

        const videoElement = document.querySelector('.player-container');


        if (videoElement) {
            if (toggleValue) {
                videoElement.classList.add('fillscreen');
            } else {
                videoElement.classList.remove('fillscreen');
            }
        }
    }

    return (
        <div
            onClick={onClickHandler}
            className='cursor-pointer'
        >
          {
            value ? <FullScreenExitIcon /> : <FullScreenIcon />
          }  
        </div>
    )
}

export default FullScreenMode