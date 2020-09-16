export function createState() {
    return {
        currentSound: null,
        requestedSound: null,
        resumeRequested: false,
        requestedScrub: null,
        isSoundPlaying: false
    };
}

export function shouldPlaySound(state) {
    return !!state.requestedSound;
}

export function didPlaySound(state) {
    state.currentSound = state.requestedSound;
    state.isSoundPlaying = true;
    state.requestedSound = null;
    return state;
}

export function playSound(state, sound) {
    state.requestedSound = sound;
    state.pauseRequested = false;
    return state;
}

export function getCurrentSound(state) {
    return state.currentSound;
}

export function isPlayingSound(state) {
    return !!getCurrentSound(state) && state.isSoundPlaying;
}

export function shouldPauseSound(state) {
    return state.pauseRequested;
}

export function didPauseSound(state) {
    state.pauseRequested = false;
    state.isSoundPlaying = false;
    return state;
}

export function pauseSound(state) {
    state.pauseRequested = true;
    state.resumeRequested = false;
    return state;
}

export function resumeSound(state) {
    state.resumeRequested = true;
    state.pauseRequested = false;
    return state;
}

export function shouldResumeSound(state) {
    return state.resumeRequested;
}

export function didResumeSound(state) {
    state.resumeRequested = false;
    state.isSoundPlaying = true;
    return state;
}

export function scrubSound(state, s) {
    state.requestedScrub = s;
    return state;
}

export function seekSound(state, s) {
    state.requestedSeek = s;
    return state;
}

export function shouldScrubSound(state) {
    return state.requestedScrub;
}

export function getScrub(state) {
    return state.requestedScrub;
}

export function didScrubSound(state) {
    state.requestedScrub = null;
    return state;
}

export function shouldSeekSound(state) {
    return state.requestedSeek;
}

export function getSeek(state) {
    return state.requestedSeek;
}

export function didSeekSound(state) {
    state.requestedSeek = null;
    return state;
}

export function toggleSound(state) {
    if (isPlayingSound(state)) {
        state = pauseSound(state);
    } else {
        state = resumeSound(state);
    }
    return state;
}