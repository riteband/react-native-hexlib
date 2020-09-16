import * as core from "./core";
import {wrapSubStatePerformSideEffects} from "@teamhex/hexlib/sideEffects";

export default wrapSubStatePerformSideEffects(function performSideEffectsSound({state, swapState, system}) {
    if (core.shouldPlaySound(state)) {
        swapState(core.didPlaySound);
        var sound = core.getCurrentSound(state);
        system.soundPlayer.play({
            id: sound.id,
            soundUrl: sound.url,
            title: sound.title,
            artist: sound.artist
        });
    } else if (core.shouldPauseSound(state)) {
        swapState(core.didPauseSound);
        system.soundPlayer.pause();
    } else if (core.shouldResumeSound(state)) {
        swapState(core.didResumeSound);
        system.soundPlayer.resume();
    } else if (core.shouldScrubSound(state)) {
        var s = core.getScrub(state);
        swapState(core.didScrubSound);
        system.soundPlayer.scrub(s);
    } else if (core.shouldSeekSound(state)) {
        var s = core.getSeek(state);
        swapState(core.didSeekSound);
        system.soundPlayer.seekTo(s);
    }
});
