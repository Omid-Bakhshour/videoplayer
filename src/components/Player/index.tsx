"use client"

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Controls from '../Controls';

const VIDEO_HLS_SRC = "https://files.vidstack.io/sprite-fight/hls/stream.m3u8";

function Player() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        let hls: Hls | null = null;

        if (videoRef.current) {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(VIDEO_HLS_SRC);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoRef.current?.play();
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = VIDEO_HLS_SRC;
                const handleLoadedMetadata = () => {
                    videoRef.current?.play();
                };
                videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

                return () => {
                    videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
                };
            }
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    return (
        <div className='w-[1500px] relative h-auto block' >
            <video ref={videoRef} className='w-full h-full block'/>
            {/* controls */}
            <Controls videoRef={videoRef} />
        </div>
    );
}

export default Player;
