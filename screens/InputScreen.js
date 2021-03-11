import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import firebase from "../firebase";

import ItemSelect from "../components/InputScreen/ItemSelect";
import { style } from "d3-selection";

const InputScreen = () => {
  const [isInputMode, setIsInputMode] = useState(false);
  const [itemList, setItemList] = useState([]);

  const cancelItemSelection = () => {
    setIsInputMode(false);
  };

  const addItem = (item) => {
    setIsInputMode(false);
    const newItem = Object.assign({}, item);
    newItem.key = Math.random().toString();
    setItemList([...itemList, newItem]);
  };

  const removeItemHandler = (itemID) => {
    setItemList((currentItems) => {
      return currentItems.filter((item) => item.key !== itemID);
    });
  };

  return (
    <View>
      <View>
        <Text style={styles.headerText}>Log Compost</Text>
      </View>
      <View>
        <FlatList
          data={itemList}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={(itemData) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.itemContainer}>
                <View style={{ margin: 5 }}>
                  <Image
                    style={{
                      flex: 1,
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                    }}
                    source={{ uri: itemData.item.image }}
                  />
                  <Text>{itemData.item.name}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeItemButton}
                onPress={() => removeItemHandler(itemData.item.key)}
              >
                <Text style={styles.addItemButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addItemButton}
          onPress={() => setIsInputMode(true)}
        >
          <Text style={styles.addItemButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ItemSelect
          visible={isInputMode}
          onCancel={cancelItemSelection}
          onAddItem={addItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    borderWidth: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    height: 100,
    width: 100,
    margin: 10,
  },
  removeItemButton: {
    backgroundColor: "red",
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addItemButton: {
    backgroundColor: "#56C568",
    height: 40,
    width: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 10,
  },
  addItemButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default InputScreen;
