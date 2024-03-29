import {
  Divider,
  DataTable,
  Button,
} from "react-native-paper";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";

export default function ViewPlanButton({ navigation, plan, userId }) {
  return (

    <SafeAreaView>
      <View>
      <Button
        icon="eye"
        mode="outlined"
        color="#1e90ff"
        onPress={() => navigation.navigate('PlanDetail', { plan, userId })}>
        Detail
      </Button>
    </View>
    </SafeAreaView>

  );
}