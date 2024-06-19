import React from 'react'
import TvIcon from '@/icons/tv_1_line.svg'
import { SetValuePartialType } from '@/models/player'
import { toggleTheatreMode } from '@/utils/player'

type Props = {
    value: boolean,
    setValue: SetValuePartialType
} 

function TheatreMode({
    value,
    setValue,
}: Props) {
    return (
        <div
            onClick={() => toggleTheatreMode(value, setValue)}
            className='cursor-pointer'
        >
            <TvIcon />
        </div>
    )
}

export default TheatreMode