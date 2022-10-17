import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import api from "./../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModuleScreen = ({ route, navigation }) => {
  const { moduleId } = route.params;
  const [module, setModule] = useState([]);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    uId().catch(console.error);
  }, []);

  useEffect(() => {
    const moduleInterval = setInterval(() => {
      //seconds = seconds + 1;
      //console.log("module page");
      uId().catch(console.error);
    }, 5000);
    return () => clearInterval(moduleInterval);
  }, []);

  const uId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    api
      .getUserProgress(moduleId, userId)
      .then((response) => setProgress(response.data));

    api.getModule(moduleId).then((response) => {
      //console.log(response.data.videoList);
      setWatchedStatus(response.data.videoList, userId);
      setTimeout(() => {
        setModule(response.data);
      }, 1000);
    });
  };

  function setWatchedStatus(videos, userId) {
    videos.forEach((element) => {
      //console.log(element.videoId);
      api
        .getIsVideoWatchedByEmployee(element.videoId, userId)
        .then((response) => {
          element.watched = response.data;
          //console.log("watched? " + response.data);
        });
    });
  }

  const renderModule = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Video", {
              vId: item.videoId,
            });
          }}
        >
          <View
            style={{
              marginTop: 20,
              padding: 55,
              backgroundColor: "white",
              borderRadius: 4,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "900" }}
            >
              {item.title}
            </Text>
            <Text style={{ textAlign: "center" }}>{item.description}</Text>
            {item.watched ? (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#295f3d",
                    marginTop: 10,
                    borderWidth: 1,
                    backgroundColor: "#dcffe7",
                    borderColor: "#dcffe7",
                    borderRadius: 4,
                  }}
                >
                  Watched
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#7f2e35",
                    marginTop: 10,
                    borderWidth: 1,
                    backgroundColor: "#fee6e2",
                    borderColor: "#fee6e2",
                    borderRadius: 4,
                  }}
                >
                  Not Watched
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    module &&
    progress &&
    module.videoList && (
      <SafeAreaView>
        <View style={{ margin: 20, maxHeight: "85%" }}>
          <Text
            style={{
              padding: 10,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            {module.title}
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}
          >
            {module.description}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 10,
            }}
          >
            {progress}
          </Text>
          <View>
            <FlatList
              data={module.videoList}
              renderItem={renderModule}
              scrollEnabled={true}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

export default ModuleScreen;
