import { CUE_CONTAINER_ID, CUSTOM_CUE } from '@/constants/controls';
import { SetValuePartialType, VolumeStateType } from '@/models/player';
import { Dispatch, MutableRefObject } from 'react';

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


export const togglePlayPause = (videoRef: MutableRefObject<HTMLVideoElement | null>) => {
    const videoElement = videoRef.current;
    if (videoElement) {
        if (videoElement.paused || videoElement.ended) {
            videoElement?.play();
        } else {
            videoElement?.pause();
        }
    }
};


export const toggleMute = (
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    setValue: Dispatch<VolumeStateType>
) => {
    const videoElement = videoRef.current;
    if (videoElement) {
        const savedVolume = localStorage.getItem('volume');
        const newMutedState = !videoElement.muted;
        videoElement.muted = newMutedState;

        setValue({
            isMuted: newMutedState,
            volume: newMutedState === true ? 0 : savedVolume ? JSON.parse(savedVolume) : 0
        });

        localStorage?.setItem('isMuted', JSON.stringify(newMutedState));
    }
};


export const toggleFullScreenMode = (value: boolean, setValue: SetValuePartialType) => {
    const toggleValue = !value
    setValue({
        fullScreen: toggleValue
    })

    const videoElement = document.querySelector('.player-container');

    if (videoElement) {
        if (toggleValue) {
            videoElement.classList.add('fullscreen');
        } else {
            videoElement.classList.remove('fullscreen');
        }
    }
}


export const toggleTheatreMode = (value: boolean, setValue: SetValuePartialType) => {
    const toggleValue = !value
    setValue({
        theatreMode: toggleValue
    })

    const videoElement = document.querySelector('.player-container');


    if (videoElement) {
        if (toggleValue) {
            videoElement.classList.add('theatre');
        } else {
            videoElement.classList.remove('theatre');
        }
    }
}