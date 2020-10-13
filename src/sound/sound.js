import TrackPlayer, {TrackPlayerEvents, Capability} from 'react-native-track-player';
import {wrapSubStatePerformSideEffects} from "@teamhex/hexlib/sideEffectsUtils";
import * as core from "./core"

function noop() {

}

export default function createSoundPlayer() {
    TrackPlayer.setupPlayer().then(() => {
        TrackPlayer.updateOptions({
            stopWithApp: false,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                TrackPlayer.CAPABILITY_JUMP_FORWARD,
                TrackPlayer.CAPABILITY_SEEK_TO
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                TrackPlayer.CAPABILITY_JUMP_FORWARD,
            ]
        });
    });

    async function seekTo(seconds) {
        await TrackPlayer.seekTo(seconds);
    }

    const soundPlayer = {
        play: function ({soundUrl, title, artist, id}) {
            var track = {
                id: id,
                url: soundUrl,
                title: title,
                artist: artist
            };
            TrackPlayer.reset();
            TrackPlayer.add([track]).then(function () {
                TrackPlayer.play();
            });
        },
        pause: function () {
            TrackPlayer.pause();
        },
        resume: function () {
            TrackPlayer.play();
        },
        initBackgroundActions: wrapSubStatePerformSideEffects(function ({system, changeState}) {
            TrackPlayer.addEventListener('remote-play', function () {
                change(core.resumeSound);
            });

            TrackPlayer.addEventListener('remote-pause', function () {
                change(core.pauseSound);
            });

            TrackPlayer.addEventListener('remote-jump-backward', function (event) {
                change(core.scrubSound, -event.interval);
            });

            TrackPlayer.addEventListener('remote-jump-forward', async function (event) {
                change(core.scrubSound, event.interval);
            });

            TrackPlayer.addEventListener('remote-seek', async function (event) {
                change(core.seekSound, event.position);
            });
        }),
        scrub: async function (seconds) {
            const position = await TrackPlayer.getPosition();
            const newPosition = Math.max(position + seconds, 0);
            console.log("scrub " + newPosition);
            await seekTo(newPosition);
        },
        seekTo: seekTo,
        onPlaybackStateChange: noop,
        onPlaybackError: noop,
        onPlatformResume: noop,
        onPlatformPause: noop,
        onPlatformScrubBackward: noop,
        onPlatformScrubForward: noop,
        onPlatformSeek: noop
    };

    TrackPlayer.addEventListener('playback-state', function (state) {
        soundPlayer.onPlaybackStateChange(state);
        console.log("playback-state", state)
    });
    TrackPlayer.addEventListener('playback-error', function (error) {
        soundPlayer.onPlaybackError(error);
        console.log("playback-error", error)
    });

    return soundPlayer;
}
