

export const initialPlayerOption = {
    currentTime: 0,
    duration: 0,
    quality: -1,
    isPlaying: false,
    isMuted: false,
    volume: 0,
    playbackRate: 1,
    theatreMode: false,
    fullScreen: false,
}

export const PLAY_BACK_RATE_LIST = [
    {
        label: "0.25x",
        value: 0.25
    },
    {
        label: "0.5x",
        value: 0.5
    },
    {
        label: "0.75x",
        value: 0.75
    },
    {
        label: "normal",
        value: 1
    },
    {
        label: "1.25x",
        value: 1.25
    },
    {
        label: "1.50x",
        value: 1.50
    },
    {
        label: "1.75x",
        value: 1.75
    },
    {
        label: "2x",
        value: 2
    },
]

export const textTracks = [
    {
      src: 'https://files.vidstack.io/sprite-fight/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
      default: false
    },
    {
        src: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
        label: 'English',
        language: 'en-US',
        kind: 'subtitles',
        default: false,
    },
  ] as const;