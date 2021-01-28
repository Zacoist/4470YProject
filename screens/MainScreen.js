import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import BarChart from "../components/BarChart";

export default class MainScreen extends React.Component {
  render() {
    const data = [
      { label: "Sun", value: 1 },
      { label: "Mon", value: 2 },
      { label: "Tue", value: 2 },
      { label: "Wed", value: 3 },
      { label: "Thu", value: 8 },
      { label: "Fri", value: 10 },
      { label: "Sat", value: 5 },
    ];
    return (
      <View style={styles.container}>
        <BarChart data={data} round={10} unit="Number of Inputs" />
        <Text>This is the home screen.</Text>
        <Button
          title="Input"
          onPress={() => this.props.navigation.navigate("Input")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
