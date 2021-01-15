import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import CompostItemQuantifier from "./CompostItemQuantifier";

const CompostInput = (props) => {
  const [weight, setWeight] = useState(0);

  const weightInputHandler = (enteredWeight) => {
    setWeight(enteredWeight);
    props.onAddWeight(weight);
  };

  return (
    <View>
      <View style={styles.componentContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold" }}>Item</Text>
          <TextInput
            placeholder={"e.g. Apple. Banana Peel"}
            onChangeText={weightInputHandler}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Amount</Text>
          <CompostItemQuantifier />
        </View>
        <TouchableOpacity
          style={styles.removeItemButton}
          onPress={props.onRemoveItem.bind(this, props.id)}
        >
          <Text style={styles.removeItemButtonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "#AAAAAA",
    height: 52,
    padding: 5,
  },
  removeItemButton: {
    backgroundColor: "red",
    height: 35,
    width: 35,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 30,
  },
  removeItemButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default CompostInput;
