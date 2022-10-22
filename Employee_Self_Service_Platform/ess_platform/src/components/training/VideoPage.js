import { Text, View, StyleSheet, Button } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { Appbar } from "react-native-paper";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import React, { useState } from "react";
// import Video from "react-native-video";
import { Video, AVPlaybackStatus } from 'expo-av';

export default function VideoCard() {
  // const [video, setVideo] = useState([{id: 1, name:"Video ##", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."}]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <>
      <Appbar.Header style={{ margin: 10, height: 30 }}>
        <Appbar.BackAction
          onPress={() => {
            HomeScreen;
          }}
        />
        <Appbar.Content title="My Playlist" />
        {/* <Appbar.Content title="Training" subtitle={"Subtitle"} /> */}
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

 
        {/* <Card.Cover
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nebraskamed.com%2Fsites%2Fdefault%2Ffiles%2F2019-03%2FGettyImages-1067019704.jpg&f=1&nofb=1&ipt=49d496320c6bc14ac9a7e6ae3a682f411985827a011f1af99d23d695356f92ea&ipo=images",
          }}
        /> */}
      <Card style={Styles.content}>
        <Card.Content>
          <Title>Video ##</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </Paragraph>
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>

<View style={Styles.container}>
      <Video
        ref={video}
        style={Styles.video}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={Styles.buttons}>
        {/* <Button title="Play from 5s" onPress={() => video.current.playFromPositionAsync(5000)} /> */}
        <Button title={status.isLooping ? "Set to not loop" : "Set to loop"} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)} />
      </View>
      </View>
  

    </>
  );
}

const Styles = StyleSheet.create({
//   container: {
//     alignContent: "center",
//     margin: 24,
//   },
  content: {
    alignContent: "center",
    margin: 5,
  },
//   videoStyle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     height: 250,
//   },
//   viewStyle :{
//     height:250
//   },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },
  buttons: {
   
    margin: 5
  }
});
