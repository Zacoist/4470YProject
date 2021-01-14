import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the sign up screen.</Text>
      <Button
        title="Complete Sign Up"
        onPress={() => navigation.navigate("Main")}
      />
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

export default SignUpScreen;
