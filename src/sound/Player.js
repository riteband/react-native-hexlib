import React, {useContext} from "react";
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    StyleSheet,
    Text,
    View
} from "react-native";
// import AppScreenParameters from "../hexlib/AppScreenParameters";
import * as core from "./core";
import * as stateUtils from "@teamhex/hexlib/stateUtils";
import * as icons from "./icons";
import {useTrackPlayerProgress} from 'react-native-track-player';

const {width} = Dimensions.get("window");
const bigPlayerStyles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flex: 1,
        margin: 16
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        padding: 16
    },
    title: {
        color: "black",
        padding: 16
    },
    cover: {
        marginVertical: 16,
        width: width - 32 * 4,
        height: width - 32 * 4,
        borderRadius: 5
    },
    metadata: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    song: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black"
    },
    slider: {
        backgroundColor: "rgba(0,0,0, 0.5)",
        width: width - 32,
        borderRadius: 2,
        height: 4,
        marginVertical: 16
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    donateButton: {
        backgroundColor: "black", color: "white", fontWeight: "600", fontSize: 14, paddingVertical: 5, paddingHorizontal: 16, borderRadius: 14, overflow: "hidden",
        marginRight: 10
    }
});

const miniPlayerStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20
    },
    text: {
        flexShrink: 1,
        color: "black",
        fontFamily: "PostGrotesk-Bold",
        fontSize: 18
    }
});

function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
        <View style={{backgroundColor: "#ddd"}}>
            <View style={{height: 5, width: (progress.position / progress.duration) * 100 + "%", backgroundColor: "black"}}/>
        </View>
    );
}

function MiniPlayer({onPress, stateId, changeState: _changeState, state: _state}) {
    const state = _state[stateId];
    const changeState = stateUtils.createChangeSubState(_changeState, stateId);

    var sound = core.getCurrentSound(state);

    return (
        <View style={{backgroundColor: "#f4f4f4"}}>
            <TouchableWithoutFeedback {...{onPress}}>
                <View>
                    <ProgressBar/>
                    <View style={miniPlayerStyles.container}>
                        <Text numberOfLines={1} style={miniPlayerStyles.text}>{sound.title}</Text>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={{padding: 16, paddingRight: 8}} onPress={() => {
                                changeState(core.scrubSound, -15);
                            }}>
                                <icons.ScrubBackwardShortIcon size="22"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding: 16}} onPress={() => {
                                changeState(core.toggleSound);
                            }}>
                                {core.isPlayingSound(state) ? <icons.PauseIcon size="22"/> : <icons.PlayIcon size="22"/>}
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding: 16, paddingLeft: 8, paddingRight: 20}} onPress={() => {
                                changeState(core.scrubSound, 15);
                            }}>
                                <icons.ScrubForwardShortIcon size="22"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height: 30}}/>
        </View>
    );
}

// const BigPlayer = () => {
//     const appFramework = useContext(AppScreenParameters);
//
//     var state = appFramework.state;
//     var swapState = appFramework.swapState;
//
//     // TODO: calc the correct height
//     return (
//         <View style={{height: 820, backgroundColor: "white"}}>
//             <SafeAreaView style={bigPlayerStyles.root}>
//                 <View style={bigPlayerStyles.container}>
//                     <View style={bigPlayerStyles.header}>
//                         <RectButton style={bigPlayerStyles.button} onPress={() => {
//                             swapState(core.onCloseBigPlayerClick)
//                         }}>
//                             <Icon name="chevron-down" color="black" size={24}/>
//                         </RectButton>
//                         <Text style={bigPlayerStyles.title}>The Bay</Text>
//                         <RectButton style={bigPlayerStyles.button}>
//                             <Icon name="more-horizontal" color="black" size={24}/>
//                         </RectButton>
//                     </View>
//                     <View style={{alignItems: "center", marginBottom: 40}}>
//                         <Image source={{uri: "https://d46xrhm44izup.cloudfront.net/rss/rp/?url=%2Fimg%2F7ed7007f86568d4d451bc90a51f81223.jpg"}} style={bigPlayerStyles.cover}/>
//                     </View>
//                     <View style={bigPlayerStyles.slider}/>
//                     <View style={bigPlayerStyles.metadata}>
//                         <View>
//                             <Text style={bigPlayerStyles.song}>The Bay</Text>
//                             <Text style={{color: colors.link, marginTop: 4}}>Metronomy</Text>
//                         </View>
//                     </View>
//                     <View style={{flex: 1}}></View>
//                     <View style={{marginBottom: 60}}>
//                         <View style={bigPlayerStyles.controls}>
//                             <Icon name="shuffle" color="rgba(0,0,0, 0.5)" size={24}/>
//                             <AntDesign name="stepbackward" color="black" size={32}/>
//                             <AntDesign name="play" color="black" size={48}/>
//                             <AntDesign name="stepforward" color="black" size={32}/>
//                             <Icon name="repeat" color="rgba(0,0,0, 0.5)" size={24}/>
//                         </View>
//                         <View style={{marginTop: 40, alignItems: "center"}}>
//                             <Text style={{color: "black", fontWeight: "600", fontSize: 18, marginBottom: 10}}>Support this pod</Text>
//                             <View style={{flexDirection: "row"}}>
//                                 <TouchableOpacity>
//                                     <Text style={bigPlayerStyles.donateButton}>
//                                         10 kr
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity>
//                                     <Text style={bigPlayerStyles.donateButton}>
//                                         20 kr
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity>
//                                     <Text style={bigPlayerStyles.donateButton}>
//                                         30 kr
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         </View>
//     );
// };

export default function Player(props) {
    return (
        <>
            {false ? null : <MiniPlayer {...props}/>}
        </>
    );
}
