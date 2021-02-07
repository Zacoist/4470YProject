import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";

import CompostInput from "../components/InputScreen/CompostInput";

const InputScreen = () => {
  const [inputItemList, setInputItemList] = useState([{ key: "0", value: 0 }]);
  const [itemID, setItemID] = useState(1);

  const addItemHandler = (item) => {
    id = itemID;
    setInputItemList((currentItems) => [
      ...currentItems,
      { key: itemID.toString(), value: item },
    ]);
    setItemID(itemID + 1);
  };

  const removeItemHandler = (itemID) => {
    setInputItemList((currentItems) => {
      return currentItems.filter((item) => item.key !== itemID);
    });
  };

  const changeInputItemListHandler = (item) => {
    setInputItemList((currentItems) => [...currentItems, item]);
  };

  return (
    <FlatList
      ListHeaderComponent={<Text style={styles.headerText}>Log Compost</Text>}
      data={inputItemList}
      renderItem={(itemData) => (
        <View style={{ alignItems: "center" }}>
          <CompostInput
            id={itemData.item.key}
            onRemoveItem={removeItemHandler}
            onAddItem={changeInputItemListHandler}
          />
        </View>
      )}
      ListFooterComponent={
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addItemButton}
              onPress={addItemHandler}
            >
              <Text style={styles.addItemButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
              Weight
            </Text>
            <View style={styles.weightInputContainer}>
              <Text style={{ color: "#AAAAAA", marginRight: 15 }}>Kg</Text>
              <View>
                <TextInput placeholder="Enter weight" />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.addItemButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Weekly Goal</Text>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={0.3}
              width={300}
              height={20}
              color="#56C568"
            />
          </View>
          <Text style={styles.headerText}>Task Progress</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <AntDesign name="star" color="black" size={64} />
            <AntDesign name="star" color="black" size={64} />
            <AntDesign name="staro" color="black" size={64} />
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addItemButton: {
    backgroundColor: "#56C568",
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 10,
  },
  addItemButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  weightInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    marginHorizontal: "5%",
    paddingHorizontal: 10,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "#56C568",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 10,
    width: "40%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  addItemButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: "5%",
  },
});

export default InputScreen;
