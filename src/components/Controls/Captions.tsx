import React, { useEffect, useState } from 'react';
import { VideoRefType } from '@/models/player';
import CaptionIcon from "@/icons/message_1_line.svg";
import { clearCues, renderCues } from '@/utils/player';

const Captions: React.FC<VideoRefType> = ({ videoRef }) => {
    const [subtitleTracks, setSubtitleTracks] = useState<TextTrackList | null>(null);
    const [currentTrack, setCurrentTrack] = useState<number | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            const tracks = videoRef.current.textTracks;
            setSubtitleTracks(tracks);
        }
    }, [videoRef]);

    const handleSubtitleTrackChange = (trackIndex: number) => {
        if (subtitleTracks) {
            for (let i = 0; i < subtitleTracks.length; i++) {
                subtitleTracks[i].mode = i === trackIndex ? 'showing' : 'hidden';
            }
            setCurrentTrack(trackIndex);
            clearCues();
            renderCues(videoRef);
        }
    };

    useEffect(() => {
        handleSubtitleTrackChange(currentTrack ?? -1);
    }, [subtitleTracks]);

    return (
        <div className='dropdown dropdown-end lg:dropdown-top'>
            <div title='captions' tabIndex={0} className="cursor-pointer">
                <CaptionIcon />
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[3]">
                <li key='off' onClick={() => handleSubtitleTrackChange(-1)}>
                    <a className={currentTrack === -1 ? 'active' : ''}>Off</a>
                </li>
                {subtitleTracks && Array.from(subtitleTracks).map((track, index) => (
                    <li key={index} onClick={() => handleSubtitleTrackChange(index)}>
                        <a className={currentTrack === index ? 'active' : ''}>{track.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Captions;
