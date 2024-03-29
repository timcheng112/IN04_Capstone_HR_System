import React, { useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthContext } from "./Context";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const windowHeight = useWindowDimensions().height;
  const passwordRef = useRef();

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView>
        <View
          style={{ alignItems: "center", minHeight: Math.round(windowHeight) }}
        >
          <View style={{ padding: 60 }}></View>
          <Image
            source={require("../../../assets/libro-logo.png")}
            resizeMode="contain"
            style={{ height: "20%", width: "75%" }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              maxHeight: 90,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                marginVertical: 10,
                width: "50%",
                borderWidth: 1,
                borderColor: "#738A9B",
                backgroundColor: "#FFFFF",
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 4,
              }}
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                borderColor: "#738A9B",
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                width: "40%",
                height: 66,
                fontSize: 20,
                backgroundColor: "#e7e7e7",
                color: "#77747b",
              }}
            >
              @libro.com
            </Text>
          </View>
          <TextInput
            secureTextEntry={true}
            style={{
              width: "90%",
              marginTop: 15,
              backgroundColor: "#FFFFF",
              borderWidth: 1,
              borderColor: "#738A9B",
              borderRadius: 4,
            }}
            label="Password"
            value={password}
            ref={passwordRef}
            returnKeyType={"done"}
            onChangeText={(password) => setPassword(password)}
            onSubmitEditing={() => {
              signIn(email, password);
            }}
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginComponent;
