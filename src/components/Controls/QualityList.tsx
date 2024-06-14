import React, { useState } from 'react';
import QualityIcon from '@/icons/movie_line.svg';

interface QualityListProps {
    qualities: any[];
    hls: any
}

const QualityList: React.FC<QualityListProps> = ({ qualities, hls}) => {
    const [currentQuality, setCurrentQuality] = useState<number>(-1);

    const handleQualityChange = (levelIndex: number) => {
        if (hls.current) {
            hls.current.currentLevel = levelIndex;
            setCurrentQuality(levelIndex);
        }
    };

    return (
        <div className='dropdown dropdown-end lg:dropdown-top'>
            <div title='quality' tabIndex={0} className="cursor-pointer">
                <QualityIcon />
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[3]">
                <li key='auto' onClick={() => handleQualityChange(-1)}>
                    <a className={currentQuality === -1 ? 'active' : ''}>Auto</a>
                </li>
                {qualities?.map((level, index) => (
                    <li key={index} onClick={() => handleQualityChange(index)}>
                        <a className={currentQuality === index ? 'active' : ''}>{level.height}p</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QualityList;
