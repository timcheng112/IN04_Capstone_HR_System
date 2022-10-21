import * as React from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { Dialog, Portal } from "react-native-paper";
import HomeScreen from "../../screens/HomeScreen";

//go to list of attendance maybe..
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const dialog = () => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Actions>
          <Button onPress={() => console.log("Cancel")}>Cancel</Button>
          <Button onPress={() => console.log("Ok")}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const actionCheckIn = (props) => (
  <Card.Actions>
    <Button>Cancel</Button>
    <Button>Ok</Button>
  </Card.Actions>
);

const CheckInOut = (props) => (
  <>
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          HomeScreen;
        }}
      />
    </Appbar.Header>

    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Title style={{ textAlign: "center", padding: 12 }}>CHECK IN/OUT</Title>

        <Paragraph>Please check-in and out at your work place.</Paragraph>
      </Card.Content>
      <Card.Cover
        style={{ marginVertical: 24 }}
        source={{
          uri: "https://cdn.stocksnap.io/img-thumbs/960w/home-office_YODJNTOBN9.jpg",
        }}
      />

      <View style={{ flexDirection: "row", margin: 10 }}>
        <View style={{ flex: 1 }}>
          <Button
            icon="clock"
            mode="contained"
            buttonColor="blue"
            onPress={() => {
              // actionCheckIn()
              console.log("Clock-in");
            }}
          >
            Check in
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            icon="clock"
            mode="outlined"
            onPress={() => console.log("Clock-out")}
          >
            Check out
          </Button>
        </View>
      </View>
    </Card>
  </>
);

export default CheckInOut;
