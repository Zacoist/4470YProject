import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const CompostItemQuantifier = (props) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View>
      <View style={styles.componentContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
        <View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={incrementQuantity}
          >
            <AntDesign name="up" style={styles.arrowUpIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={decrementQuantity}
          >
            <AntDesign name="down" style={styles.arrowDownIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "#AAAAAA",
    flexDirection: "row",
  },
  quantityText: {
    paddingHorizontal: 10,
  },
  arrowContainer: {
    flex: 1,
  },
  arrowButton: {
    width: 40,
  },
  arrowUpIcon: {
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#DDDDDD",
  },
  arrowDownIcon: {
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "#DDDDDD",
  },
});

export default CompostItemQuantifier;
