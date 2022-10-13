import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Card, Button, Title, Paragraph, Icon } from "react-native-paper";

// const PlaylistPage = () => {
//   return (
//     <View>
//       <Text>PlaylistPage</Text>
//     </View>
//   )
// }

// export default PlaylistPage
export default function PlaylistPage() {
  const data = [
    { id: 1, name: "Video #1" },
    { id: 2, name: "Video #2" },
    { id: 3, name: "Video #3" },
    { id: 4, name: "Video #4" },
  ];
  return (
    <>
      <Text>test</Text>
      {/* <Paragraph>Test</Paragraph> */}
      {/* <View>
        <FlatList
          //   ListHeaderComponent={<Text>Playlist</Text>}
          data={data}
          renderItem={({ item }) => 
            <Card>
              <View style={{ flex: 1, flexDirection: "row", padding: "10" }}>
                <Text>Id: </Text>
                <Text>{item.id}</Text>
              </View>
            </Card>
          }
          keyExtractor={(item) => item.id}
        />
      </View> */}
    </>
  );
}

// const styles = StyleSheet.create({});
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',

    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});

// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media


// import * as React from 'react';
// import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
// const { width, height } = Dimensions.get('screen');
// // import faker from 'faker'

// // faker.seed(10);
// const DATA = [...Array(5).keys()].map((_, i) => {
//     return {
//         key: 1,
//         image: `https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/`,
//         name: <Text>Text</Text>,
//         email: <Text>email@email.com</Text>,
//     };
// });

// const SPACING = 20;
// const AVATAR_SIZE = 70;

// export default () => {
//     return <View style={{flex: 1, backgroundColor: '#fff'}}>
//         <StatusBar hidden/>
//     </View>
// }