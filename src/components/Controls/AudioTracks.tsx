import React, { useState, useEffect, useRef } from 'react';
import { VideoRefType } from '@/models/player';
import Hls from 'hls.js';
import CaptionIcon from "@/icons/message_1_line.svg";

interface AudioTrackSelectorProps extends VideoRefType {
    hls: Hls | null;
}

const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const AudioTracks: React.FC<AudioTrackSelectorProps> = ({ videoRef, hls }) => {
    const [audioTracks, setAudioTracks] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<number>(-1); // -1 for no selection

    useEffect(() => {
        if (hls) {
            setAudioTracks(hls.audioTracks)
            setCurrentTrack(hls.audioTrack)
        }
    }, [hls, hls?.audioTracks]);

    const handleAudioTrackChange = (trackId: number) => {
        if (hls && videoRef.current) {
            // Only detach and reattach media on iOS devices
            hls.detachMedia();
            hls.attachMedia(videoRef.current);
            hls.audioTrack = trackId;
            setCurrentTrack(trackId);
            videoRef.current.play()
        }
    };


    const isSubtitleExist = audioTracks && Array.isArray(Array.from(audioTracks)) && Array.from(audioTracks).length > 0
    if (!isSubtitleExist) {
        return <></>
    }

    return (
        <div className='dropdown dropdown-end lg:dropdown-top'>
            <div title='Audio Tracks' tabIndex={0} className="cursor-pointer">
                <CaptionIcon />
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
