import React, { useState, useMemo } from "react";
import {
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

//worldmap
import Map from "../components/Map";

import COLORS from "../constants/Colors";

import Container from "../components/Container";
//LIBRARIES
import * as d3 from "d3";

//DATA
import districtData_raw from "../assets/data/district_data.json";

const MainScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("window");

  const [stat, setStat] = useState("input");

  const districtData = useMemo(() => {
    const districtsAsArray = Object.keys(districtData_raw).map((key) => ({
      name: key,
      data: districtData_raw[key],
    }));

    return districtsAsArray;
  }, []);

  const maxY = useMemo(() => {
    return d3.max(districtData, (district) => district.data[stat]);
  }, [stat]);

  const colorize = useMemo(() => {
    const colorScale = d3
      .scaleSequentialSymlog(d3.interpolateReds)
      .domain([0, maxY]);

    return colorScale;
  });

  const foobar_data = [
    { label: "Sun", value: 1 },
    { label: "Mon", value: 2 },
    { label: "Tue", value: 2 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 8 },
    { label: "Fri", value: 10 },
    { label: "Sat", value: 5 },
  ];

  return (
    <Container>
      <View>
        <View style={{ height: 20 }} />
        <Map
          dimensions={dimensions}
          data={districtData}
          colorize={colorize}
          stat={stat}
        />
        <View style={{ height: 20 }} />
        <BarChart data={foobar_data} round={10} unit="Number of Inputs" />
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
        <View style={{ height: 40 }} />
        <Text style={styles.textcenter}>More coming soon!</Text>
      </View>
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
