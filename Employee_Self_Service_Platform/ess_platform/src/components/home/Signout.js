import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../login/Context";

function Signout() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Button mode="contained" onPress={() => signOut()}>
        Sign Out
      </Button>
    </SafeAreaView>
  );
}

export default Signout;
