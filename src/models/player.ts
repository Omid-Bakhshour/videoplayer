import { Dispatch, SetStateAction } from "react";

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
    isPlaying: boolean
    isMuted: boolean
    volume: number
    playbackRate: number
    theatreMode: boolean
}

export type ControlPropsType = {
    value: PlayerOptionType
    setValue: SetValuePartialType
} & VideoRefType
  

export type PlayerOptionsObjectType =  Partial<PlayerOptionType>;

export type SetValuePartialType = (object: PlayerOptionsObjectType) => void