// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
// import { View, Text } from "react-native";
// import React from "react";

// export default function AttendanceStats() {
//   return (
//     <View>
//       <Text>Bezier Line Chart</Text>
//       <LineChart
//         data={{
//           labels: ["January", "February", "March", "April", "May", "June"],
//           datasets: [
//             {
//               data: [
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//               ],
//             },
//           ],
//         }}
//         width={Dimensions.get("window").width} // from react-native
//         height={220}
//         yAxisLabel="$"
//         yAxisSuffix="k"
//         yAxisInterval={1} // optional, defaults to 1
//         chartConfig={{
//           backgroundColor: "#e26a00",
//           backgroundGradientFrom: "#fb8c00",
//           backgroundGradientTo: "#ffa726",
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//           propsForDots: {
//             r: "6",
//             strokeWidth: "2",
//             stroke: "#ffa726",
//           },
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//     </View>
//   );
// }

//heatmap? or calendar
// const commitsData = [
//     { date: "2017-01-02", count: 1 },
//     { date: "2017-01-03", count: 2 },
//     { date: "2017-01-04", count: 3 },
//     { date: "2017-01-05", count: 4 },
//     { date: "2017-01-06", count: 5 },
//     { date: "2017-01-30", count: 2 },
//     { date: "2017-01-31", count: 3 },
//     { date: "2017-03-01", count: 2 },
//     { date: "2017-04-02", count: 4 },
//     { date: "2017-03-05", count: 2 },
//     { date: "2017-02-30", count: 4 }
//   ];
{
  /* <ContributionGraph
values={commitsData}
endDate={new Date("2017-04-01")}
numDays={105}
width={screenWidth}
height={220}
chartConfig={chartConfig}
/> */
}

import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Title, Paragraph, Icon } from "react-native-paper";
import { Appbar } from "react-native-paper";
import HomeScreen from "../../screens/HomeScreen";

import React from "react";

const AttendanceStats = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            HomeScreen;
          }}
        />
        <Text>Whereever this is from in rostering</Text>
      </Appbar.Header>

      {/* figure out how to parse everything per card*/}
      <View>
        <Card style={Styles.container}>
          <Card.Content>
            <Title>My Attendance</Title>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://lensasoftware.com/wp-content/uploads/2017/06/3d-Pie-Chart_Powerpoint.png' }} />
          <Card.Content>
            <Paragraph>
                Present: 28 Days
          
            </Paragraph>
            <Paragraph>
                Absent: 2 Days

            </Paragraph>
            <Paragraph>
                Leaves: 1
            </Paragraph>
            {/* <Paragraph>
                Report any abnormalities to reporting supervisor
            </Paragraph> */}
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default AttendanceStats;

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 37,
  },
});
