"use client"

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Controls from '../Controls';

const VIDEO_HLS_SRC = "https://files.vidstack.io/sprite-fight/hls/stream.m3u8";
const VIDEO_MP4_SRC = "https://files.vidstack.io/sprite-fight/720p.mp4"

const isHlsSource = (src: string) => {
    return src.endsWith(".m3u8");
};

function Player() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hls = useRef<Hls | null>(null);
    const [qualities, setQualities] = useState<any>([]);

    useEffect(() => {

        if (videoRef.current) {
            if (Hls.isSupported() && isHlsSource(VIDEO_HLS_SRC)) {
                hls.current = new Hls();
                hls.current.loadSource(VIDEO_HLS_SRC);
                hls.current.attachMedia(videoRef.current);
                hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
                    setQualities(hls.current?.levels)
                    videoRef.current?.play();
                });
            } else {
                videoRef.current.src = VIDEO_MP4_SRC;
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
            if (hls.current) {
                hls.current.destroy();
            }
        };
    }, []);


    const options = {
        qualities
    }

    return (
        <div className='w-full lg:w-[900px]  bg-black relative block player-container' >
            <video ref={videoRef} className='w-full h-[500px] block object-contain'/>
            {/* controls */}
            <Controls videoRef={videoRef} hls={hls} {...options} />
        </div>
    );
}

export default Player;
