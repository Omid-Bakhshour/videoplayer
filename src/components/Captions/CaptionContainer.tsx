import React, { useEffect, useRef } from 'react';
import { VideoRefType } from '@/models/player';
import { renderCues } from '@/utils/player';
import { CUE_CONTAINER_ID } from '@/constants/controls';

const CaptionContainer: React.FC<VideoRefType> = ({ videoRef }) => {

    const renderCueHandler = () => {
        renderCues(videoRef)
    }

    useEffect(() => {
        if (videoRef.current) {
            const tracks = videoRef.current.textTracks;

            for (let i = 0; i < tracks.length; i++) {
                tracks[i].addEventListener('cuechange', renderCueHandler);
            }

            return () => {
                if (videoRef.current) {
                    for (let i = 0; i < tracks.length; i++) {
                        tracks[i].removeEventListener('cuechange', renderCueHandler);
                    }
                }
            };
        }
    }, [videoRef]);

    useEffect(() => {
        renderCues(videoRef);
    }, []);

    return (
        <div className='w-full flex flex-col flex-1 justify-center align-bottom'>
            <div className='flex-1' />
            <div id={CUE_CONTAINER_ID} className="cue-container"></div>
        </div>
    );
};

export default CaptionContainer;
