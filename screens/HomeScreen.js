import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Image
        source={require("../assets/titlelogo.png")}
        style={{
          width: 250,
          height: 250,
        }}
      />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
        mycompostpal
      </Text>
      <View style={{ height: 60 }} />
      {/* <Button
        color="#56C568"
        title="Sign Up"
        onPress={() => navigation.navigate("Sign Up")}
      />
      <View style={styles.space} />
      <Button
        color="#56C568"
        title="Log In"
        onPress={() => navigation.navigate("Login")}
      /> */}
      {/* sign up button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={{ color: "#56C568", fontWeight: "bold", fontSize: 18 }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      {/* login button */}
      <TouchableOpacity
        style={styles.buttontwo}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Log In
        </Text>
      </TouchableOpacity>
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
  button: {
    alignItems: "center",
    width: 200,
    padding: 10,
    backgroundColor: "white",
  },
  buttontwo: {
    alignItems: "center",
    width: 200,
    padding: 10,
    backgroundColor: "#56C568",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

export default HomeScreen;
