import React from 'react'
import TvIcon from '@/icons/tv_1_line.svg'
import { SetValuePartialType, VideoRefType } from '@/models/player'

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} & VideoRefType


function TheatreMode({
    value,
    setValue,
    videoRef,
}: Props) {
    const onClickHandler = () => {
        const toggleValue = !value
        setValue({
            theatreMode: toggleValue
        })

        if (videoRef.current) {
            if (toggleValue) {
                videoRef.current.classList.add('theatre');
            } else {
                videoRef.current.classList.remove('theatre');
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