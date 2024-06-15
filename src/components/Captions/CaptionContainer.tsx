import React, { useEffect } from 'react';
import { VideoRefType } from '@/models/player';

const CaptionContainer: React.FC< VideoRefType > = ({ videoRef }) => {

    useEffect(() => {
        if (videoRef.current) {
            const track = videoRef.current.textTracks[1];
            track.mode = 'showing';

            const cueRenderer = () => {
                const activeCues = track.activeCues;
                const cueContainer = document.getElementById('cueContainer');
                if (cueContainer) {
                    cueContainer.innerHTML = '';
                    if(activeCues) {
                        Array.from(activeCues).map((cue) => {
                            const vttCue = cue as VTTCue;
                            const cueElement = document.createElement('div');
                            cueElement.className = 'custom-cue';
                            cueElement.innerText = vttCue.text;
                            cueContainer.appendChild(cueElement);
                        });
                    }
                }
            };

            track.addEventListener('cuechange', cueRenderer);

            return () => {
                track.removeEventListener('cuechange', cueRenderer);
            };
        }
    }, [videoRef]);

    return (
        <div className='w-full flex flex-col flex-1 justify-center align-bottom'>
            <div className='flex-1' />
            <div id="cueContainer" className="cue-container"></div>
        </div>
    );
};

export default CaptionContainer;
