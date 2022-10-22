import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Training({ navigation }) {
  const [modules, setModules] = useState([]);
  const [training, setTraining] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [visible, setVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshModules, setRefreshModules] = useState(false);

  useEffect(() => {
    uId().catch(console.error);
    setRefreshing(true);
    getModuleList();
  }, [refreshKey]);

  useEffect(() => {
    const trainingInterval = setInterval(() => {
      //seconds = seconds + 1;
      //console.log("training page");
      uId().catch(console.error);
      getModuleList();
    }, 5000);
    return () => clearInterval(trainingInterval);
  }, []);

  const uId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    //console.log('userId ' + userId);
    api.getUserModules(userId).then((response) => {
      //console.log(userId);
      setProgress(response.data, userId);
      const timer = setTimeout(() => {
        setTraining(response.data);
      }, 1000);
      return () => clearTimeout(timer);
      //console.log(response.data);
      setRefreshing(false);
    });
    api
      .getUserCompletedModules(userId)
      .then((response) => setCompleted(response.data));
  };

  const getModuleList = () => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
        //console.log("Successful in fetching modules");
        //console.log(response.data);
        setRefreshModules(false);
      })
      .catch(() => console.log("Error: Failure fetching playlists"));
  };

  useEffect(() => {
    setRefreshing(true);
  }, [refreshKey]);

  function setProgress(training, userId) {
    training.forEach((element) => {
      //console.log(element.moduleId);
      api.getUserProgress(element.moduleId, userId).then((response) => {
        element.progress = response.data;
        //console.log("progress? " + response.data);
      });
    });
  }

  const renderModule = ({ item }) => {
    const image = item.thumbnail;
    //console.log('item.id ' + item.moduleId)
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Module", {
            moduleId: item.moduleId,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#ffff",
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#ffff",
            margin: 5,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: "40%", height: 140 }}
          />
          <View>
            <Text
              style={{
                paddingTop: 30,
                paddingLeft: 10,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ padding: 10 }}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTraining = ({ item }) => {
    const image = item.thumbnail;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Module", {
            moduleId: item.moduleId,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#ffff",
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#ffff",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: "40%", height: 140 }}
          />
          <View>
            <Text
              style={{
                paddingTop: 30,
                paddingLeft: 10,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ padding: 10 }}>{item.description}</Text>
            <Text style={{ padding: 10 }}>{item.progress}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    modules &&
    training &&
    completed && (
      <>
        {modules.length === 0 ? (
          <>
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                alignContent: "center",
                alignItems: "center",
                flex: 1,
                fontSize: 28,
              }}
            >
              No modules available
            </Text>
          </>
        ) : (
          <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                My Training
              </Text>
              <FlatList
                data={training}
                renderItem={renderTraining}
                keyExtractor={(item) => item.moduleId}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={uId} />
                }
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginVertical: 15,
                }}
              >
                All Modules
              </Text>
              <FlatList
                data={modules}
                renderItem={renderModule}
                keyExtractor={(item) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshModules}
                    onRefresh={getModuleList}
                  />
                }
              />
            </SafeAreaView>
          </View>
        )}
      </>
    )
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
