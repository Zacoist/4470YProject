import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";

import firebase from "../../firebase";

const ItemSelect = (props) => {
  {
    /** pull compost item data from database */
  }

  const setList = (category) => {
    var listRef = firebase.database().ref("compost-items/" + category);
    listRef.once("value", async (snapshot) => {
      setItemList(snapshot.val());
    });
  };

  {
    /** determines whether confirm button is disabled
    button is enabled once an item is selected */
  }
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const [itemList, setItemList] = useState(() => setList("fruit"));

  const selectItem = (item) => {
    setIsDisabled(false);
    setSelectedItem(item);
  };

  const confirmItem = () => {
    setIsDisabled(true);
    props.onAddItem(selectedItem);
  };

  return (
    <Modal visible={props.visible} animationType={"slide"}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() => setItemList(setList("fruit"))}
        >
          <Text style={styles.categoryText}>Fruit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => setItemList(setList("vegetable"))}
        >
          <Text style={styles.categoryText}>Vegetable</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => setItemList(setList("other"))}
        >
          <Text style={styles.categoryText}>Other</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={itemList}
          numColumns={3}
          contentContainerStyle={styles.itemList}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => selectItem(itemData.item)}
            >
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
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
        <TouchableOpacity
          style={isDisabled ? styles.confirmDisabled : styles.confirm}
          disabled={isDisabled}
          onPress={confirmItem}
        >
          <Text
            style={isDisabled ? styles.buttonDisabledText : styles.buttonText}
          >
            Confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={props.onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  category: {
    marginHorizontal: 5,
    height: 40,
    width: "30%",
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "#56C568",
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
  },
  itemList: {
    padding: 10,
  },
  item: {
    borderWidth: 1.5,
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    height: 110,
    width: 110,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    height: 40,
    width: "40%",
    backgroundColor: "red",
    borderRadius: 10,
    margin: "5%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  buttonDisabledText: {
    color: "#BBBBBB",
    fontWeight: "bold",
    fontSize: 24,
  },
  confirm: {
    height: 40,
    width: "40%",
    backgroundColor: "red",
    borderRadius: 10,
    margin: "5%",
    backgroundColor: "#56C568",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmDisabled: {
    height: 40,
    width: "40%",
    backgroundColor: "red",
    borderRadius: 10,
    margin: "5%",
    backgroundColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ItemSelect;
