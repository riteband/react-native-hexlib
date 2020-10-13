import * as core from "./core";
import {wrapSubStatePerformSideEffects} from "@teamhex/hexlib/sideEffectsUtils";

export default wrapSubStatePerformSideEffects(function performSideEffectsSound({state, changeState, system}) {
    if (core.shouldPlaySound(state)) {
        changeState(core.didPlaySound);
        var sound = core.getCurrentSound(state);
        system.soundPlayer.play({
            id: sound.id,
            soundUrl: sound.url,
            title: sound.title,
            artist: sound.artist
        });
    } else if (core.shouldPauseSound(state)) {
        changeState(core.didPauseSound);
        system.soundPlayer.pause();
    } else if (core.shouldResumeSound(state)) {
        changeState(core.didResumeSound);
        system.soundPlayer.resume();
    } else if (core.shouldScrubSound(state)) {
        var s = core.getScrub(state);
        changeState(core.didScrubSound);
        system.soundPlayer.scrub(s);
    } else if (core.shouldSeekSound(state)) {
        var s = core.getSeek(state);
        changeState(core.didSeekSound);
        system.soundPlayer.seekTo(s);
    }
});
