import React, { useState, useMemo, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Card,
  TouchableOpacity,
} from "react-native";
import BarChart from "../components/BarChart";
import Weather from "../components/Weather";
//worldmap
import Map from "../components/Map";

import COLORS from "../constants/Colors";

import Container from "../components/Container";
//LIBRARIES
import * as d3 from "d3";

import firebase from "../firebase";

const MainScreen = ({ navigation }) => {
  const [rawDistrictData, setRawDistrictData] = useState({});
  const [stat, setStat] = useState("input");

  useEffect(() => {
    fetch(
      "https://compostapp-28145-default-rtdb.firebaseio.com/district_data.json"
    )
      .then((response) => response.json())
      .then(
        (responseJson) => {
          setRawDistrictData(responseJson);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [rawDistrictData]);

  const userID = firebase.auth().currentUser.uid;

  const dimensions = Dimensions.get("window");

  const districtData = useMemo(() => {
    const districtsAsArray = Object.keys(rawDistrictData).map((key) => ({
      name: key,
      data: rawDistrictData[key],
    }));

    return districtsAsArray;
  }, [rawDistrictData]);

  const maxY = useMemo(() => {
    return d3.max(districtData, (district) => district.data[stat]);
  }, [rawDistrictData, stat]);

  const colorize = useMemo(() => {
    const colorScale = d3
      .scaleSequentialSymlog(d3.interpolateReds)
      .domain([0, maxY]);

    return colorScale;
  }, [rawDistrictData]);

  return (
    <Container>
      <Weather />
      <View style={styles.space} />
      <Map
        dimensions={dimensions}
        data={districtData}
        colorize={colorize}
        stat={stat}
      />
      <View style={styles.space} />
      <View>
        <BarChart userID={userID} round={10} unit="Number of Inputs" />
      </View>
      <View style={styles.space} />
      {/* input button */}
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor: "#56C568",
            borderWidth: 1,
            backgroundColor: "#56C568",
          },
        ]}
        onPress={() => navigation.navigate("Input")}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            },
          ]}
        >
          Input
        </Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <Text style={styles.textcenter}>More coming soon!</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  space: {
    width: 20, // or whatever size you need
    height: 50,
  },
  textcenter: {
    textAlign: "center",
    fontSize: 30,
  },
  input: {
    width: "85%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default MainScreen;
