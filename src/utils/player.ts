import { CUE_CONTAINER_ID, CUSTOM_CUE } from '@/constants/controls';
import { MutableRefObject } from 'react';

export const renderCues = (
    videoRef: MutableRefObject<HTMLVideoElement | null>
) => {
    const cueContainer = document.getElementById(CUE_CONTAINER_ID);
        if (cueContainer && videoRef.current) {
            for (let i = 0; i < videoRef.current.textTracks.length; i++) {
                const track = videoRef.current.textTracks[i];
                if (track.mode === 'showing') {
                    const activeCues = track.activeCues;
                    if (activeCues) {
                        Array.from(activeCues).forEach((cue) => {
                            const vttCue = cue as VTTCue;
                            const cueElement = document.createElement('div');
                            cueElement.className = CUSTOM_CUE;
                            cueElement.innerText = vttCue.text;
                            cueContainer.appendChild(cueElement);
                        });
                    }
                }
            }
        }
};


export const clearCues = () => {
    const cueContainer = document.getElementById(CUE_CONTAINER_ID);
    if (cueContainer) {
        cueContainer.innerHTML = '';
    }
};
