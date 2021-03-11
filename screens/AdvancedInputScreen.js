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
import firestore from "@react-native-firebase/firestore";

import CompostInput from "../components/AdvancedInputScreen/CompostInput";
import firebase from "../firebase";

const InputScreen = () => {
  const [inputItemList, setInputItemList] = useState([{ key: "0", value: "" }]);
  const [itemID, setItemID] = useState(1);

  const addItemHandler = (item) => {
    console.log(inputItemList);
    id = itemID;
    setInputItemList((currentItems) => [
      ...currentItems,
      { key: itemID.toString(), value: item },
    ]);
    setItemID(itemID + 1);
    var uid = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref("users/" + uid);
    userRef.on("value", (snapshot) => {
      console.log(snapshot.val().address);
    });
  };

  const removeItemHandler = (itemID) => {
    setInputItemList((currentItems) => {
      return currentItems.filter((item) => item.key !== itemID);
    });
  };

  const changeItemHandler = (text, itemID) => {
    setInputItemList((currentItems) => {
      for (i = 0; i < currentItems.length; i++) {
        if (currentItems[i].key == itemID) {
          currentItems[i].value = text;
        }
      }
      return currentItems;
    });
  };

  const changeInputItemListHandler = (item) => {
    setInputItemList((currentItems) => [...currentItems, item]);
  };

  const confirmInputHandler = async () => {
    var uid = firebase.auth().currentUser.uid;

    {
      /** create create compost data section if it doens't exist */
    }
    var userRef = firebase.database().ref("users/" + uid);
    userRef.once("value", async (snapshot) => {
      if (snapshot.val().compostdata == undefined) {
        await userRef.update({
          compostdata: {
            totalcomposts: 0,
          },
        });
      }
    });

    var compostDataRef = firebase
      .database()
      .ref("users/" + uid + "/compostdata");

    {
      /** create data compost items section if it doesn't exist */
    }
    compostDataRef.once("value", async (snapshot) => {
      if (!snapshot.child("compostitems").exists()) {
        await compostDataRef.update({
          compostitems: {
            item: 0,
          },
        });
      }
    });

    compostDataRef.once("value", async (snapshot) => {
      console.log("aaa");
      var compostItemsRef = firebase
        .database()
        .ref("users/" + uid + "/compostdata/compostitems");
      for (i = 0; i < inputItemList.length; i++) {
        console.log("bbb");
        if (!snapshot.child("compostitems").child(inputItemList[i].exists)) {
          await compostItemsRef.update({
            [inputItemList[i]]: 0,
          });
        }
      }
    });

    compostDataRef.once("value", async (snapshot) => {
      {
        /** increment total composts */
      }
      var compostNum = snapshot.val().totalcomposts;
      if (compostNum != undefined) {
        await compostDataRef.update({
          totalcomposts: compostNum + 1,
        });
      } else {
        {
          /** create total composts field if it doesn't exist */
        }
        await compostDataRef.update({
          totalcomposts: 1,
        });
      }
    });
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
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmInputHandler}
            >
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
