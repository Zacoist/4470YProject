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

//DATA
// import districtData_raw from "../assets/data/district_data.json";

import firebase from "../firebase";

// function MyComponent() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);

//   // Note: the empty deps array [] means
//   // this useEffect will run once
//   // similar to componentDidMount()
//   useEffect(() => {
//     fetch(
//       "https://compostapp-28145-default-rtdb.firebaseio.com/district_data.json"
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           // var districtData = [];
//           setIsLoaded(true);
//           setItems(result);
//           console.log(items);
//         },
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);
//   if (error) {
//     console.log(error);
//   } else if (!isLoaded) {
//     console.log("not loaded");
//   } else {
//     console.log("error");
//   }
// }

// fetch("https://compostapp-28145-default-rtdb.firebaseio.com/district_data.json")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

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
  }, []);

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
      <View>
        <View>
          <Weather />
        </View>
        <View style={{ height: 20 }} />
        <Map
          dimensions={dimensions}
          data={districtData}
          colorize={colorize}
          stat={stat}
        />
        <View style={{ height: 20 }} />
        <BarChart userID={userID} round={10} unit="Number of Inputs" />
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
