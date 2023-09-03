import { createContext } from 'react';

const SoundscapeContext = createContext({
    currentNotes: undefined as Array<number>,
    masterVolume: undefined as number,
    waveform: undefined as string,
    attackTime: undefined as number,
    sustainLevel: undefined as number,
    releaseTime: undefined as number,
    noteLength: undefined as number,
    vibratoSpeed: undefined as number,
    vibratoAmount: undefined as number,
    delayAmount: undefined as number,
    delayTime: undefined as number,
    feedback: undefined as number,
    tempo: undefined as number,
    isPlaying: undefined as boolean,
    currentNoteIndex: undefined as number,
    notes: undefined as Record<string, number>,
    setNoteSelects: undefined as Function,
    setCurrentNotes: undefined as Function,
    setWaveform: undefined as Function,
});

export default SoundscapeContext;