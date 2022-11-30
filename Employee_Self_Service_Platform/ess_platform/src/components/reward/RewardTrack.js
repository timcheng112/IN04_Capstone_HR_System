import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, StyleSheet, Text, SafeAreaView, SectionList, StatusBar, Image } from "react-native";
import {
  Divider,
  DataTable,
  Button,
} from "react-native-paper";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RewardTrack({ navigation, userId }) {
  const [track, setTrack] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    loadRewardTrack();
  }, []);

  useEffect(() => {
    loadRewardTrack();
    api.getUser(userId)
        .then((response) => {
            console.log("GET USER");
            console.log(response.data);
            setUser(response.data);
        })
        .catch(() => {
            console.log("ERROR GETTING USER");
        })
  }, [refreshing]);

  const loadRewardTrack = () => {
    console.log("LOAD REWARD TRACK");
    console.log("USER ID " + userId);
    api
      .getRewardTrackByEmployee(userId)
      .then((response) => {
        console.log(response.data);
        setRefreshing(false);
        setTrack(response.data);
        setRewards(response.data.rewards);
        console.log("Successfully fetched Employee Reward Track");
      })
      .catch(() => console.log("Error trying to fetch Employee Reward Track"));
  }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
//        backgroundColor: '#121212',
      },
      header: {
          fontWeight: '600',
          fontSize: 24,
          color: 'rgba(0, 0, 0, 1)',
          padding: 10,
        },
      footer: {
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
            backgroundColor: "white",
            margin: "4%",
            elevation: 10,
            borderRadius: 15,
            padding:15,
          },
      sectionHeader: {
        fontWeight: '1',
        fontSize: 1,
        color: 'rgba(0, 0, 0, 1)',
        marginTop: 0,
        marginBottom: 0,
      },
      item: {
        margin: 12.5,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.20)',
        borderRadius: 15,
        backgroundColor: '#F8F8F8',
      },
      itemPhoto: {
        width: 200,
        height: 200,
      },
      itemText: {
        color: 'rgba(0, 0, 0, 0.8)',
        marginTop: 10,
        fontSize:18,
      },
      button: {
        marginTop:12.5,
        marginBottom:0,
        backgroundColor:'#BED2DD',
      }
    });

    const ListItem = ({ item }) => {
      return (
        <View style={styles.item}>

          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>Points Required: {item.pointsRequired}</Text>
          <Button
              style={styles.button}
              icon="eye"
              mode="outlined"
              color="rgba(0, 0, 0, 8)"
              onPress={() => navigation.navigate('RewardDetail', { userId, item})}>
              More Info
          </Button>
        </View>
      );
    };

  const SECTIONS = [
    {
      title: "",
      data: rewards,
    },
  ];

  return (
    userId && (
        <>
            {track.length === 0 ? (
                <>
                    <View
                      style={{
                        flex:1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        margin: "4%",
                        elevation: 10,
                        borderRadius: 20,
                        paddingBottom: "4%"
                      }}
                    >
                      <Image style={{flex:1, width:200}} resizeMode="contain" source={require("../../../assets/shiba-cant-find-documents.png")} />
                      <Text style={{ fontSize: 20, fontFamily: "Poppins_500Medium" }}>No Active Reward Track</Text>
                    </View>
                </>
            ) : (
                <View style={styles.container}>
                  <SafeAreaView style={{ flex: 1 }}>
                    <Text style={styles.header}>{track.name}</Text>
                    <SectionList
                      contentContainerStyle={{ paddingHorizontal: 10 }}
                      stickySectionHeadersEnabled={false}
                      sections={SECTIONS}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                      )}
                      renderItem={({ item }) => {
                        return <ListItem item={item} />;
                      }}
                      showsVerticalScrollIndicator={true}
                    />
                    <Text style={styles.footer}>You have {user.rewardPoints} reward points</Text>
                  </SafeAreaView>
                </View>
            )}
        </>
    )


  );
}