import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Card, Button, Title, Paragraph, Icon, FAB } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default function PlaylistPage() {
  const [video, setVideos] = useState([
    { id: 1, name: "Video #1" },
    { id: 2, name: "Video #2" },
    { id: 3, name: "Video #3" },
    { id: 4, name: "Video #4" },
    { id: 5, name: "Video #5" },
    { id: 6, name: "Video #6" },
    { id: 7, name: "Video #7" },
  ]);

  const [playlist, setPlaylist] = useState([
    { id: 1, name: "Playlist #1", desc:"Sample description for PlayList ##."}
  ]);
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
//   useEffect(() => {
//     // This will run when the page first loads and whenever the title changes
//     playlist.name;
//   }, [title]);

  return (
    <>
      <Appbar.Header style={{margin: 10, height:40 }}>
        <Appbar.BackAction
          onPress={() => {
            HomeScreen;
          }}
        />
        <Appbar.Content  title="My Training" />
        {/* <Appbar.Content title="Training" subtitle={"Subtitle"} /> */}
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      {/* <Text>test</Text> */}
      <View style={styles.container}>

      <FlatList
          data={playlist}
          //destructure item in array as it is another value
          renderItem={({ item }) => (
            <><Title style={styles.title}>{item.name}</Title>
            <Paragraph style={styles.paragraph}>{item.desc} </Paragraph></>
          )}
        />
        
        <FlatList
          data={video}
          //destructure item in array as it is another value
          renderItem={({ item }) => (
            <><Text style={styles.item}><Button  icon="play">
             {item.name} </Button> </Text></>
          
          )}
        />
      </View>
    </>
  );
}

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',

    backgroundColor: "#ffff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "500",
    // textAlign: "center",
    padding: 10,
  },
  item: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#dedede",
    fontSize: 20,
    fontWeight: "700",
    borderRadius: 50/10,
    textAlign: "center",
    textDecorationColor:"black",
    // flex:1,    
    // justifyContent:"center",
    // alignItems:"center",
  },
  title:{
    textAlign: "center",
    fontSize: 30,
    flex:1
  }
});
