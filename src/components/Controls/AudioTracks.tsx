import React, { useState, useEffect } from 'react';
import { VideoRefType } from '@/models/player';
import Hls from 'hls.js';
import CaptionIcon from "@/icons/message_1_line.svg";

interface AudioTrackSelectorProps extends VideoRefType {
    hls: Hls | null;
}

const AudioTracks: React.FC<AudioTrackSelectorProps> = ({ videoRef, hls }) => {
    const [audioTracks, setAudioTracks] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<number>(-1); // -1 for no selection

    useEffect(() => {
        if (hls) {
            console.log('sdsd')
            console.log(hls.audioTracks)
            setAudioTracks(hls.audioTracks)
            setCurrentTrack(hls.audioTrack)
        }
    }, [hls, hls?.audioTracks]);

    const handleAudioTrackChange = (trackId: number) => {
        if (hls) {
            hls.audioTrack = trackId;
            setCurrentTrack(trackId);
        }
    };

    const isSubtitleExist = audioTracks && Array.isArray(Array.from(audioTracks)) && Array.from(audioTracks).length > 0
    if(!isSubtitleExist) {
        return <></>
    }

    return (
        <div className='dropdown dropdown-end lg:dropdown-top'>
            <div title='Audio Tracks' tabIndex={0} className="cursor-pointer">
                <CaptionIcon/>
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {audioTracks.map((track, index) => (
                    <li key={index} onClick={() => handleAudioTrackChange(index)}>
                        <a className={currentTrack === index ? 'active' : ''}>{track.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudioTracks;
