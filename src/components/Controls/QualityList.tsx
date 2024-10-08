import React, { useState } from 'react';
import QualityIcon from '@/icons/movie_line.svg';
import { SetValuePartialType } from '@/models/player';

interface QualityListProps {
    qualities: any[];
    hls: any
    value: number
    setValue: SetValuePartialType
}

const QualityList: React.FC<QualityListProps> = ({ 
    qualities,
    hls,
    value,
    setValue
}) => {
    const shouldShowComponent = hls && hls.current && qualities && Array.isArray(qualities) && qualities.length > 0    

    if(!shouldShowComponent) {
        return <></>
    }

    const handleQualityChange = (levelIndex: number) => {
        if (hls.current) {
            hls.current.currentLevel = levelIndex;
            setValue({
                quality: levelIndex
            });
        }
    };

    return (
        <div className='dropdown dropdown-end lg:dropdown-top'>
            <div title='quality' tabIndex={0} className="cursor-pointer">
                <QualityIcon />
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[3]">
                <li key='auto' onClick={() => handleQualityChange(-1)}>
                    <a className={value === -1 ? 'active' : ''}>Auto</a>
                </li>
                {qualities?.map((level, index) => (
                    <li key={index} onClick={() => handleQualityChange(index)}>
                        <a className={value === index ? 'active' : ''}>{level.height}p</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QualityList;
