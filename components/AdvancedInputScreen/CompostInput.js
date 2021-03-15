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
  const [item, setItem] = useState(["", 1]);

  const itemInputHandler = (enteredItem) => {
    setItem(enteredItem);
  };

  const incrementQuantity = () => {
    setItem([item[0], item[1] + 1]);
  };

  const decrementQuantity = () => {
    if (item[1] > 0) {
      setItem([item[0], item[1] - 1]);
    }
  };

  return (
    <View>
      <View style={styles.componentContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold" }}>Item</Text>
          <TextInput
            placeholder={"e.g. Apple. Banana Peel"}
            onChangeText={itemInputHandler}
            style={styles.input}
          />
        </View>
        <Text>{item[1]}</Text>
        <View>
          <Text style={{ fontWeight: "bold" }}>Amount</Text>
          <CompostItemQuantifier
            onIncrease={incrementQuantity}
            onDecrease={decrementQuantity}
          />
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
