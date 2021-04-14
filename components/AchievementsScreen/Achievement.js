import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import firebase from "../../firebase";

import { Ionicons } from "@expo/vector-icons";

const Achievement = (props) => {
  const [isFill, setIsFill] = useState(
    props.isFill ? "trophy" : "trophy-outline"
  );

  useEffect(() => {
    var uid = firebase.auth().currentUser.uid;
    var achieveRef = firebase.database().ref("users/" + uid + "/compostdata");
    achieveRef.once("value", async (snapshot) => {
      switch (props.code) {
        case "first_comp":
          if (snapshot.val().totalcomposts >= 1) {
            setIsFill("trophy");
          }
          break;
        case "5_comp":
          if (snapshot.val().totalcomposts >= 5) {
            setIsFill("trophy");
          }
          break;
        case "10_comp":
          if (snapshot.val().totalcomposts >= 10) {
            setIsFill("trophy");
          }
          break;
        case "100_comp":
          if (snapshot.val().totalcomposts >= 100) {
            setIsFill("trophy");
          }
          break;
        case "1kg_emission":
          if (snapshot.val().methaneWeight >= 1000) {
            setIsFill("trophy");
          }
          break;
        case "10kg_comp":
          console.log(snapshot.val().weight);
          if (snapshot.val().weight >= 10000) {
            setIsFill("trophy");
          }
          break;
        case "100kg_comp":
          if (snapshot.val().weight >= 100000) {
            setIsFill("trophy");
          }
          break;
        default:
          setIsFill("trophy-outline");
      }
    });
  }, []);
  return (
    <View style={styles.achievementContainer}>
      <Ionicons name={isFill} color="silver" outline="black" size={64} />
      <Text style={{ textAlign: "center" }}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  achievementContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default Achievement;
