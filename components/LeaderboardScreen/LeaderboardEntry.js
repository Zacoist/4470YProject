import { rollups } from "d3-array";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LeaderboardEntry = (props) => {
  const getStyle = () => {
    if (props.rank == 1) {
      return {
        backgroundColor: "gold",
      };
    } else if (props.rank == 2) {
      return {
        backgroundColor: "silver",
      };
    } else if (props.rank == 3) {
      return {
        backgroundColor: "#cd7f32",
      };
    } else if (props.isUser == true) {
      return {
        backgroundColor: "#66d578",
      };
    } else {
      return {
        backgroundColor: "#dddddd",
      };
    }
  };
  return (
    <View style={[styles.container, getStyle()]}>
      <Text style={styles.textContainer}>{props.rank}</Text>
      <Text style={styles.textContainer}>{props.location}</Text>
      <Text style={[styles.textContainer, { textAlign: "center" }]}>
        {props.name}
      </Text>
      <Text style={[styles.textContainer, { textAlign: "right" }]}>
        {props.score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
});

export default LeaderboardEntry;
