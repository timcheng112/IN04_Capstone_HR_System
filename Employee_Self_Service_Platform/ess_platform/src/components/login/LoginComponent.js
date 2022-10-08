import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthContext } from "./Context";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ padding: 40 }}></View>
        <Image
          source={require("../../../assets/libro-logo.png")}
          resizeMode="contain"
          style={{ height: "20%", width: "100%" }}
        />
        <View style={{ padding: 15 }}></View>
        <TextInput
          style={{ marginVertical: 10, width: "90%" }}
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={{ width: "90%" }} 
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          style={{ margin: 10, backgroundColor: "#FBB344" }}
          mode="contained"
          onPress={() => {
            signIn(email, password);
          }}
        >
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default LoginComponent;
