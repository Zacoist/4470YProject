import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the home screen.</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("Sign Up")} />
      <View style={styles.space} />
      <Button title="Log In" onPress={() => navigation.navigate("Login")} />
      <View style={styles.space} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#56C568",
  },

  space: {
    width: 20, // or whatever size you need
    height: 10,
  },
});

export default HomeScreen;
