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
    const onCLickHandler = () => {
        const toggleValue = !value
        setValue({
            theatreMode: toggleValue
        })
    }

    return (
        <div
            onClick={onCLickHandler}
            className='cursor-pointer'
        >
            <TvIcon />
        </div>
    )
}

export default TheatreMode