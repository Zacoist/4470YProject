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
import { now } from "d3-timer";
var days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const InputScreen = () => {
  const [isInputMode, setIsInputMode] = useState(false);
  const [itemList, setItemList] = useState([]);

  const getProgress = () => {
    let green = 0;
    let brown = 0;
    for (let i = 0; i < itemList.length; i++) {
      let ctype = itemList[i].compostType;
      if (ctype == "green") {
        green++;
      } else brown++;
    }

    if (green > 0) return green / (green + brown);
    else if (brown > 0 && green == 0) return -1;
    else return 0;
  };

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

  {
    /*returns sum of weights and methane weights of items*/
  }
  const getWeights = () => {
    weight = 0;
    methaneWeight = 0;
    for (i = 0; i < itemList.length; i++) {
      weight += itemList[i].weight;
      methaneWeight += itemList[i].methaneWeight;
    }

    return { weight, methaneWeight };
  };

  const confirmItemsHandler = () => {
    var uid = firebase.auth().currentUser.uid;
    var day = days[new Date().getDay()];
    var weights = getWeights();
    var localWeight = weights.weight;
    var localMethaneWeight = weights.methaneWeight;

    var compostDataRef = firebase
      .database()
      .ref("users/" + uid + "/compostdata");

    var dailyInputRef = firebase
      .database()
      .ref("users/" + uid + "/weekly_inputs");

    var usersRef = firebase.database().ref("users/" + uid);
    usersRef.once("value", async (snapshot) => {
      try {
        var userAddress = snapshot.val().address;
      } catch (err) {
        //You'll see the msg when signing up becaues of the delay it take when creating fullname record in database
        console.log("Error:", err);
      }

      var districtDataRef = firebase
        .database()
        .ref("district_data/" + userAddress);

      districtDataRef.once("value", async (childSnapshot) => {
        var input = childSnapshot.val().input;

        districtDataRef.update({
          input: input + 1,
        });
      });
    });

    var fruitRef = firebase.database().ref("compost-items");
    compostDataRef.once("value", async (snapshot) => {
      {
        /** increment total composts */
      }
      try {
        var compostNum = snapshot.val().totalcomposts;
        var weight = snapshot.val().weight;
        var methaneWeight = snapshot.val().methaneWeight;

        compostDataRef.update({
          totalcomposts: compostNum + 1,
          weight: weight + localWeight,
          methaneWeight: methaneWeight + localMethaneWeight,
        });
      } catch (err) {
        //You'll see the msg when signing up becaues of the delay it take when creating fullname record in database
        console.log("Error:", err);
      }
    });

    dailyInputRef.once("value", async (snapshot) => {
      try {
        var dailyNum = snapshot.val()[day];

        dailyInputRef.update({
          [day]: dailyNum + 1,
        });
      } catch (err) {
        //You'll see the msg when signing up becaues of the delay it take when creating fullname record in database
        console.log("Error:", err);
      }
    });

    // dailyInputRef.once("value", async (snapshot) => {
    //   try {
    //     var dailyNum = snapshot.val()[day];
    //   } catch (err) {
    //     //You'll see the msg when signing up becaues of the delay it take when creating fullname record in database
    //     console.log("Error:", err);
    //   }
    //   await dailyInputRef.update({
    //     [day]: dailyNum + 1,
    //   });
    // });

    setItemList([]);
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <View>
            <Text style={styles.headerText}>Log Compost</Text>
          </View>
          <View style={{ flex: 0 }}></View>
        </View>
      }
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
      ListFooterComponent={
        <View>
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.addItemButton, { marginBottom: "10%" }]}
              onPress={confirmItemsHandler}
            >
              <Text style={styles.addItemButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
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
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 10,
  },
  addItemButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

export default InputScreen;
