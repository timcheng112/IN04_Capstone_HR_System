import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Badge,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RejectionDialog = ({ hideDialog, visible, swapRequest }) => {
  return (
    // <Provider>
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ borderRadius: 20, padding: 5 }}
        >
          <Dialog.Title
            style={{ textAlign: "center", fontFamily: "Poppins_600SemiBold" }}
          >
            Swap Request Response
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 10,
                marginBottom: 10,
                width: "100%",
              }}
            >
              <Paragraph
                style={{
                  //   backgroundColor: "#4f46e5",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 10,
                  padding: 10,
                  //   color: "white",
                  color: "grey",
                  textAlign: "center",
                }}
                size={24}
              >
                {swapRequest.status}
              </Paragraph>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0078fe",
                  padding: 10,
                  marginLeft: "34%",
                  borderRadius: 5,
                  //marginBottom: 15,
                  marginTop: 5,
                  marginRight: "5%",
                  maxWidth: "50%",
                  alignSelf: "flex-end",
                  //maxWidth: 500,
                  borderRadius: 20,
                }}
              >
                <Paragraph
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  {swapRequest.reason}
                </Paragraph>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#0078fe",
                    //backgroundColor:"red",
                    width: 20,
                    height: 25,
                    bottom: 0,
                    borderBottomLeftRadius: 25,
                    right: -10,
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    //backgroundColor:"green",
                    width: 20,
                    height: 35,
                    bottom: -6,
                    borderBottomLeftRadius: 18,
                    right: -20,
                  }}
                ></View>
              </View>
              <Paragraph>{swapRequest.requestor.firstName}</Paragraph>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Paragraph>{swapRequest.receiver.firstName}</Paragraph>
              <View
                style={{
                  backgroundColor: "#dedede",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: "10%",
                  maxWidth: "50%",
                  alignSelf: "flex-start",
                  //maxWidth: 500,
                  //padding: 14,
                  //alignItems:"center",
                  borderRadius: 20,
                }}
              >
                <Paragraph
                  style={{
                    fontSize: 16,
                    color: "#000",
                    justifyContent: "center",
                  }}
                >
                  {swapRequest.responseReason}
                </Paragraph>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#dedede",
                    //backgroundColor:"red",
                    width: 20,
                    height: 25,
                    bottom: 0,
                    borderBottomRightRadius: 25,
                    left: -10,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    //backgroundColor:"green",
                    width: 20,
                    height: 35,
                    bottom: -6,
                    borderBottomRightRadius: 18,
                    left: -20,
                  }}
                />
              </View>
            </View>
            {swapRequest.reviewerResponseReason && (
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Paragraph>Reviewer</Paragraph>
                <View
                  style={{
                    backgroundColor: "#dedede",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    marginLeft: "10%",
                    maxWidth: "50%",
                    alignSelf: "flex-start",
                    //maxWidth: 500,
                    //padding: 14,
                    //alignItems:"center",
                    borderRadius: 20,
                  }}
                >
                  <Paragraph
                    style={{
                      fontSize: 16,
                      color: "#000",
                      justifyContent: "center",
                    }}
                  >
                    {swapRequest.reviewerResponseReason}
                  </Paragraph>
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#dedede",
                      //backgroundColor:"red",
                      width: 20,
                      height: 25,
                      bottom: 0,
                      borderBottomRightRadius: 25,
                      left: -10,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      //backgroundColor:"green",
                      width: 20,
                      height: 35,
                      bottom: -6,
                      borderBottomRightRadius: 18,
                      left: -20,
                    }}
                  />
                </View>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Okay</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    // </Provider>
  );
};

export default RejectionDialog;
