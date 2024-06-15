import React from 'react'
import TvIcon from '@/icons/tv_1_line.svg'
import { SetValuePartialType } from '@/models/player'

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} 


function TheatreMode({
    value,
    setValue,
}: Props) {
    const onClickHandler = () => {
        const toggleValue = !value
        setValue({
            theatreMode: toggleValue
        })

        const videoElement = document.querySelector('.player-container');


        if (videoElement) {
            if (toggleValue) {
                videoElement.classList.add('theatre');
            } else {
                videoElement.classList.remove('theatre');
            }
        }
    }

    return (
        <div
            onClick={onClickHandler}
            className='cursor-pointer'
        >
            <TvIcon />
        </div>
    )
}

export default TheatreMode