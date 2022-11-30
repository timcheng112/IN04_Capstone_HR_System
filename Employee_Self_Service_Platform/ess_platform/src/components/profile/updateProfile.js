import React, { useEffect, useState } from "react";
import { IconButton, Text , TextInput} from "react-native-paper";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

export default function UpdateProfile({ navigation, userId }) {
//   const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(-1);
  const [bankAcc, setBankAcc] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const { text, image } =
    ("test",
    "https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1-705x705.png");

//   const uId = async () => {
//     setRefreshing(true);
//     const userId = await AsyncStorage.getItem("userId");
//     // console.log("userId " + userId);
//     setUserId(userId);
//   };

//   useEffect(() => {
//     uId().catch(console.error);
//     // userInfo().catch(console.error);
//   }, []);

  useEffect(() => {
    const userInfo = async () => {
      const userId = await AsyncStorage.getItem("userId");
      api
        .getUser(userId)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          console.log(response.data.phone);
          console.log(response.data.email);
          console.log(response.data.bankAccNo);
          setPhoneNo(response.data.phone);
          setEmail(response.data.email);
          setBankAcc(response.data.bankAccNo);
        })
        .catch(console.error);
    };
    userInfo();
  }, []);


  function updateProfile(email, phone, bankAcc){
    api.updateProfile(userId, email, phoneNo, bankAcc).then( (response) => {console.log(response.data); navigation.navigate("Profile");})

  }


  const Styles = StyleSheet.create({
    // container: {
    //   alignContent: "center",
    //   margin: 30,
    // },
    // profileImage: {
    //     width: 200,
    //     height: 200,
    //     borderRadius: 20,
    //     overflow: "hidden"
    // },
    // image: {
    //     flex: 1,
    //     height: undefined,
    //     width: undefined
    // },
    container: {
      width: "100%",
      height: 100,
      marginTop: 25,
      marginBottom: 15,
      borderRadius: 15,
      backgroundColor: "#FFFFFF",
      overflow: "hidden",
      shadowOpacity:10,
      padding: 12
    },

    image: {
      width: "20%",
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    //   borderRadius:50
    },

    textContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    text: {
      fontWeight: "bold",
      fontSize: 20,
    },
    photo: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#91001fa9",
        },
    menuItemHeader:{
        backgroundColor: '#13AEBD',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
  });
  return (
    user &&  email && phoneNo && bankAcc && (
      <>
        {/* <View style={Styles.profileImage}>
        <Image
          source={require("./assets/profile-pic.jpg")}
          //source={require("./assets/profile-picture.png")}
          style={Styles.image}
          resizeMode="center"
        ></Image>
      </View> */}
        {console.log(user)}
        <ImageBackground
            style={Styles.photo}
            source={{
                // uri: "https://img.freepik.com/premium-photo/top-view-multicolored-confetti-turquoise-background_23-2148340768.jpg",
              }}
          >
        <View
          style={{
            flex: 2,
            backgroundColor: "lightgray",
            justifyContent: "center",
            padding: 15,
          }}
        >
          
          <Card style={Styles.container}>
          <Card.Title title={"Update Profile "} subtitle={"Update your personal information"} style={Styles.menuItemHeader}/>
          {/* <Card.Cover style={Styles.photo} 
          source={{
            uri: "https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1-705x705.png",
        }}
        /> */}
    
          <Card.Content>
            
          </Card.Content>

          
          </Card>
          <Card>
          {/* <TextInput
          label="Phone"
          mode="outlined"
          value={phone}
          onChangeText=)}
        /> */}
        <TextInput
          label="Phone"
          mode="outlined"
          value={phoneNo}
          onChangeText={phoneNo => setPhoneNo(phoneNo)}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          label="Bank Account"
          mode="outlined"
          value={bankAcc}
          onChangeText={bankAcc => setBankAcc(bankAcc)}
        />
          <Button 
            icon="account"
            mode="contained"
            buttonColor="white"
            onPress={() => {
              // action
              console.log("Clicked");
              updateProfile(email, phoneNo, bankAcc)
            }}
          >
            Update profile
          </Button>
          
          </Card>
          {/* <View style={Styles.textContainer}>
          <Button
            icon="account"
            mode="contained"
            buttonColor="blue"
            onPress={() => {
              // actionCheckIn()
              console.log("Clock-in");

            }}
          >
            Update profile
          </Button>
       
            </View> */}

          <View style={Styles.textContainer}>
              <Text style={Styles.text}>Leaving scanning space for NFC/QR</Text>
              {/* <Image style={Styles.image} source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png",
              }}></Image> */}
            </View>

          {/* <View style={Styles.container}>
            <Image
              style={Styles.image}
              source={{
                uri: "https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1-705x705.png",
              }}
            />

            <View style={Styles.textContainer}>
              <Text style={Styles.text}></Text>
            </View>
          </View> */}
        </View></ImageBackground>


    
        {/* <Card style={Styles.container}>
        <Card.Content>
          <Title>Company Card</Title>
        </Card.Content>
        <Card.Cover 
          source={{
            uri: "https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1-705x705.png",
        }}
        />
        <>
          <Card.Content>
            <Paragraph>{user.firstName}</Paragraph>
          </Card.Content>
          <Card.Actions>
           
          </Card.Actions>
        </>
      </Card> */}
      </>
    )
  );
}
