import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  Button,
} from "react-native";

const SettingsScreen = () => {
  const [switch1Value, setSwitchValue1] = useState(true);
  const [switch2Value, setSwitchValue2] = useState(true);
  const [switch3Value, setSwitchValue3] = useState(false);

  const toggleSwitch1 = (value) => {
    //To handle switch toggle
    setSwitchValue1(value);
    //State changes according to switch
  };
  const toggleSwitch2 = (value) => {
    //To handle switch toggle
    setSwitchValue2(value);
    //State changes according to switch
  };
  const toggleSwitch3 = (value) => {
    //To handle switch toggle
    setSwitchValue3(value);
    //State changes according to switch
  };

  return (
    <View>
      <View style={styles.switchText}>
        <Text style={{ color: "black", fontSize: 16 }}>
          {switch1Value ? "Notifications: ON" : "Notifications: OFF"}
        </Text>
        <Switch
          style={(style = styles.switches)}
          onValueChange={toggleSwitch1}
          value={switch1Value}
        />
      </View>
      <View style={styles.switchText}>
        <Text style={{ color: "black", fontSize: 16 }}>
          {switch2Value ? "Location: ON" : "Location: OFF"}
        </Text>
        <Switch
          style={(style = styles.switches)}
          onValueChange={toggleSwitch2}
          value={switch2Value}
        />
      </View>
      <View style={styles.switchText}>
        <Text style={{ color: "black", fontSize: 16 }}>
          {switch3Value ? "Dark Mode: ON" : "Dark Mode: OFF"}
        </Text>
        <Switch
          style={(style = styles.switches)}
          onValueChange={toggleSwitch3}
          value={switch3Value}
        />
      </View>
      <View style={styles.text}>
        <Text> </Text>
        <Text>Postal Code</Text>
        <TextInput style={styles.input} placeholder="Postal Code" />
        <Text>Province</Text>
        <TextInput style={styles.input} placeholder="Province" />
      </View>
      <View style={styles.button}>
        <Button color="#56C568" title="Change Password" />
      </View>
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
  switches: {
    margin: 25,
    alignItems: "flex-end",
  },
  switchText: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  button: {
    borderRadius: 10,
    padding: 30,
  },
  text: {
    borderRadius: 10,
    padding: 30,
  },
});

export default SettingsScreen;
