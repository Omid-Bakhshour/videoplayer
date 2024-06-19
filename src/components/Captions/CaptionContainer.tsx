"use client"

import React, { useEffect } from 'react';
import { VideoRefType } from '@/models/player';
import { clearCues, renderCues } from '@/utils/player';
import { CUE_CONTAINER_ID } from '@/constants/controls';

const CaptionContainer: React.FC<VideoRefType> = ({ videoRef }) => {
    const renderCueHandler = () => {
        clearCues();
        renderCues(videoRef)
    }

    useEffect(() => {
        if (videoRef.current) {
            const tracks = videoRef.current.textTracks;
            const isSubtitleExist = tracks && Array.isArray(Array.from(tracks)) && Array.from(tracks).length > 0

            if (isSubtitleExist) {
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
        }
    }, [videoRef]);

    return (
        <div className='w-full flex flex-col flex-1 justify-center align-bottom'>
            <div className='flex-1' />
            <div id={CUE_CONTAINER_ID} className="cue-container"></div>
        </div>
    );
};

export default CaptionContainer;
