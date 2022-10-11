import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Card, Button, Title, Paragraph, Icon } from "react-native-paper";
import { Appbar } from "react-native-paper";
import HomeScreen from "../../screens/HomeScreen";

// const OneCard = () =>{

// <Card style={Styles.container}>
//       <Card.Content>
//           <Title>Attendance</Title>
//       </Card.Content>
//       <Card.Cover source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' }} />
//      <Card.Content>
//       <Paragraph>A Computer Science portal for Geeks</Paragraph>
//       </Card.Content>
//       <Card.Actions>
//         <Button>Add To Favourites</Button>
//       </Card.Actions>
//     </Card>

// }

//  <FlatList
//         data={yourData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <Card> ... </Card>}
//      />

export default function AttendanceComponent() {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            HomeScreen;
          }}
        />
        <Text>Whereever this is from in rostering</Text>
      </Appbar.Header>

      {/* <Text>AttendanceComponent</Text> */}

      <SafeAreaView>
        <View>
          <Card>
            <Text style={styles.paragraph}>Attendance List</Text>
          </Card>
        </View>

        <View>
          <Card style={{flexDirection: 'row'}}>
            <Card.Content>
              <Title>January</Title>
            </Card.Content>
            {/* <Card.Cover /> */}
            <Card.Content>
              <Paragraph>Electronics Event.</Paragraph>
            </Card.Content>
            <Card.Actions  buttonStyle={{ justifyContent: 'flex-end' }}>
              <Button buttonStyle={{ justifyContent: 'flex-end' }}>View</Button>
            </Card.Actions>
          </Card>
        </View>

        <View>
          <Card style={{flexDirection: 'row'}}>
            <Card.Content>
              <Title>February</Title>
            </Card.Content>
            {/* <Card.Cover /> */}
            <Card.Content>
              <Paragraph>Outlet A Morning Shift Team B</Paragraph>
            </Card.Content>
            <Card.Actions  buttonStyle={{ justifyContent: 'flex-end' }}>
              <Button buttonStyle={{ justifyContent: 'flex-end' }}>View</Button>
            </Card.Actions>
          </Card>
        </View>

        <View>
          <Card style={{flexDirection: 'row'}}>
            <Card.Content>
              <Title>March</Title>
            </Card.Content>
            {/* <Card.Cover /> */}
            <Card.Content>
              <Paragraph>Outlet A Morning Shift Team A</Paragraph>
            </Card.Content>
            <Card.Actions  buttonStyle={{ justifyContent: 'flex-end' }}>
              <Button buttonStyle={{ justifyContent: 'flex-end' }}>View</Button>
            </Card.Actions>
          </Card>
        </View>
      </SafeAreaView>

      {/* <OneCard />  */}
    </>
  );
}

//  AttendanceComponent = () => {
//     return(

//     )
// }
// export default AttendanceComponent ;

const styles = StyleSheet.create({
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
