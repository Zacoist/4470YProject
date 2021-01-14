import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the login screen.</Text>
      <Button title="Log In" onPress={() => navigation.navigate("Main")} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default LoginScreen;
