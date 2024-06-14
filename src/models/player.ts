export type VideoRefType = {
    videoRef: React.RefObject<HTMLVideoElement>;
}

export type VolumeStateType = {
    isMuted: boolean,
    volume: number
}

export type PlayerOptionType = {
    currentTime: number
    duration: number
    quality: number
}