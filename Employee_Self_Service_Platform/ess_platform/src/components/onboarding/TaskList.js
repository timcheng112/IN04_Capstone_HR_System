import React from "react";
import { View } from "react-native";
import { Text, Card, Checkbox } from "react-native-paper";

function TaskList() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View>
      <Text variant="titleLarge">Category 1</Text>
      {/* Render List Items of Task */}
      <Card style={{ borderRadius: 10, width: "96%", alignSelf: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Card.Title title="Task 1" subtitle="This is task 1." />
        </View>
      </Card>
    </View>
  );
}

export default TaskList;
