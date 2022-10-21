import React, { useCallback, useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { Video } from "expo-av";
import { Alert, FlatList, SafeAreaView, View } from "react-native";
import api from "./../utils/api";
import YoutubePlayer from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VideoScreen = ({ route, navigation }) => {
  const { vId } = route.params;
  const video = React.useRef();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [videoId, setVideoId] = useState(0);
  const [watched, setWatched] = useState(false);
  const [secondsWatched, setSecondsWatched] = useState(1);

  const onStateChange = useCallback((state) => {
    if (state === "playing") {
      setPlaying(true);
      setEnded(false);
    }
    if (state === "paused") {
      setPlaying(false);
    }
    if (state === "ended") {
      setPlaying(false);
      setEnded(true);
    }
  }, []);

  const markWatched = async () => {
    const userId = await AsyncStorage.getItem("userId");
    video.current?.getDuration().then((getDuration) => {
      //console.log("seconds " + secondsWatched);
      //console.log("equal to " + parseInt(getDuration) == secondsWatched)
      if (secondsWatched >= parseInt(getDuration)) {
        //console.log('watched')
        api
          .markVideoAsWatched(vId, userId)
          .then((response) => Alert.alert(response.data));
        setEnded(false);
      }
    });
  };

  useEffect(() => {
    if (playing) {
      const track = setInterval(() => {
        setSecondsWatched(secondsWatched + 1);
      }, 1000);
      return () => clearInterval(track);
    }

    if (ended && watched == false) {
      console.log("sec  " + secondsWatched);
      markWatched().catch(console.error);
    }
  });

  useEffect(() => {
    loadVideo();
    uId().catch(console.error);
  }, []);

  const uId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    api.getIsVideoWatchedByEmployee(vId, userId).then((response) => {
      setWatched(response.data);
      //console.log(response.data);
    });
  };

  const loadVideo = () => {
    api.getVideo(vId).then((response) => {
      //console.log(response.data);
      setCurrentVideo(response.data);
      setVideoId(response.data.video.substring(17));
    });
  }

  useEffect(() => {
    const videoInterval = setInterval(() => {
      //console.log("video page");
      uId().catch(console.error);
      loadVideo();
    }, 3000);
    return () => clearInterval(videoInterval);
  }, []);

  return (
    currentVideo && (
      <SafeAreaView>
        <View
          style={{
            margin: 20,
            borderWidth: 1,
            borderColor: "#ffff",
            backgroundColor: "#ffff",
            padding: 10,
            borderRadius: 4,
          }}
        >
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              {currentVideo.title}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "400" }}
            >
              {currentVideo.description}
            </Text>
            {watched ? (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#295f3d",
                    marginTop: 10,
                    borderWidth: 1,
                    backgroundColor: "#dcffe7",
                    borderColor: "#dcffe7",
                    borderRadius: 4,
                    width: "40%",
                  }}
                >
                  Watched
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#7f2e35",
                    marginTop: 10,
                    borderWidth: 1,
                    backgroundColor: "#fee6e2",
                    borderColor: "#fee6e2",
                    borderRadius: 4,
                    width: "40%",
                  }}
                >
                  Not Watched
                </Text>
              </>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
              ref={video}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

export default VideoScreen;
