import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import api from "../../utils/api";
// import { Appbar } from "react-native-paper";
// import AppBar from './navigation/Appbar.js';
// const [playlist, setPlaylist] = useState(null);

const ListItem = ({ item }) => {
  return (
    <>
      <View style={styles.item}>
        {console.log("test"+ item.thumbnail )}
        <Image
          source={{
            uri: item.thumbnail,
            
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.description}</Text>
      </View>
    </>
  );
};

export default function TrainingHR() {


  const [playlist, setPlaylist] = useState([]);
  const [myPlaylist, setMyPlaylist] =useState([]);
  const [visible, setVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    api
      .getAllPlaylists()
      .then((response) => {
        setPlaylist(response.data);
        // setRefreshing(false);
        console.log("Successful in fetching playlists");
        // console.log(response.data);
      })
      .catch(() => console.log("Error: Failure fetching playlists"));
  }, [refreshKey]);

  useEffect(() => {
    setRefreshing(true);
    api
      .getUserPlaylists(6)
      .then((response) => {
        setMyPlaylist(response.data);
        // setRefreshing(false);
        console.log("Successful in fetching user playlists");
        console.log(myPlaylist);
      })
      .catch(() => console.log("Error: Failure fetching user playlists"));
  }, [refreshKey]);

  const SECTIONS = [
    {
      title: "My Playlist",
      horizontal: true,
      data: myPlaylist
    },
    {
      title: "All Playlists",
      data: playlist
    },
    
  ];
  
  return (
    <>
      <Text
        style={{
          fontWeight: "800",
          fontSize: 24,
          color: "#000000",
          // backgroundColor: "#ffffff",

          padding: 10,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Welcome to Libro Training
      </Text>
      <View style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={myPlaylist}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      //   backgroundColor: '',
      margin: 20,
    },
    sectionHeader: {
      fontWeight: "800",
      fontSize: 18,
      color: "#000000",
      marginTop: 25,
      marginBottom: 5,
    },
    item: {
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    itemPhoto: {
      width: 250,
      height: 200,
      borderRadius: 50 / 10,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "white",
    },
    itemText: {
      color: "rgba(0, 0, 0, 1)",
      marginTop: 5,
      fontWeight: "700",
      justifyContent: "center",
    },
  });