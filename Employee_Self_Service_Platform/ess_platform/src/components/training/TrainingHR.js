import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
// import { Appbar } from "react-native-paper";
// import AppBar from './navigation/Appbar.js';

const ListItem = ({ item }) => {
  return (
    <>
    
      <View style={styles.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
        
      </View>
    </>
  );
};

export default () => {
  return (
    <>
      <Text style={{fontWeight: "800",
    fontSize: 24,
    color: "#000000",
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    }}>Welcome to Libro Training</Text>
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
                    data={section.data}
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
};

const SECTIONS = [
  {
    title: "My Playlist",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.entrepreneur.com%2Fcontent%2F3x2%2F2000%2Fmarketing-sales-presentations.jpg&f=1&nofb=1&ipt=669f1a898aa4f6eae5df4bce153a5e43926528bf9b68183cde27f5ee573ad07c&ipo=images",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nebraskamed.com%2Fsites%2Fdefault%2Ffiles%2F2019-03%2FGettyImages-1067019704.jpg&f=1&nofb=1&ipt=49d496320c6bc14ac9a7e6ae3a682f411985827a011f1af99d23d695356f92ea&ipo=images",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjamestiffinjr.com%2Fwp-content%2Fuploads%2F2016%2F05%2FReading.jpg&f=1&nofb=1&ipt=928e4788b97410c584c0078576375406cc23972808e386fa7f683b5401f074cf&ipo=images",
      },
    ],
  },
  {
    title: "Topic #1 Sales Management",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.skillsportal.co.za%2Fsites%2Fdefault%2Ffiles%2Ffield%2Fimage%2Fsalesperson.jpg&f=1&nofb=1&ipt=f47cba69a5293b1e3094392f350aaf3d4ddb0d3f3b40f4f19f0c9832b8c7c527&ipo=images",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.business2community.com%2Fwp-content%2Fuploads%2F2015%2F02%2FBest-Sales-Leads-Strategy-900x600.jpg&f=1&nofb=1&ipt=a8cd4f03de0a1fb2d95ca595cf9bda2d91fa864104f30b0a2c8d245d4ad3c306&ipo=images",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.loscerritosnews.net%2Ffile%2F2020%2F11%2Fhi-tech.jpg&f=1&nofb=1&ipt=9f1aba715aeac4497b3abd6f1d229878fcd1672dc7f58ba3d1b29fec8cecf725&ipo=images",
      },

    ],
  },
  {
    title: "Topic #2 Leisure",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw.wallha.com%2Fws%2F12%2FYGyHew5g.jpg&f=1&nofb=1&ipt=d1080d15457f737c8dcf75786b54a5604da328eb8ffc191a9020efc88e81b1ed&ipo=images",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thelist.com%2Fimg%2Fuploads%2F2017%2F02%2Frsz_jogging.jpg&f=1&nofb=1&ipt=7db5c42d36122eda4bd078a7ec14c86c9d8c977c585272a95283087b73085f1b&ipo=images",
      },

    ],
  },
];

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
    alignItems: "center" 
    
  },
  itemPhoto: {
    width: 250,
    height: 200,
    borderRadius: 100 / 4,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
  },
  itemText: {
    color: "rgba(0, 0, 0, 1)",
    marginTop: 5,
    fontWeight:"700",
    justifyContent: "center"
  },
});
