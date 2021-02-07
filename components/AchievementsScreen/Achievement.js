import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Achievement = (props) => {
  const getIcon = () => {
    if (props.isFill == true) {
      return "trophy";
    } else return "trophy-outline";
  };

  return (
    <View style={styles.achievementContainer}>
      <Ionicons name={getIcon()} color="silver" outline="black" size={64} />
      <Text style={{ textAlign: "center" }}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  achievementContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Achievement;
