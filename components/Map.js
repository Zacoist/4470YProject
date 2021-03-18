import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

//LIBRARIES
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";

//CONSTANTS
import { DISTRICTS } from "../constants/DistrictShapes";
import COLORS from "../constants/Colors";

const Map = (props) => {
  const [districtList, setDistrictList] = useState([]);

  const { dimensions, data, colorize, stat } = props;

  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width;
  }, [dimensions]);

  const districtPaths = useMemo(() => {
    // very sensitive center and scale
    const projection = d3
      .geoEqualEarth()
      .center([-81.23, 42.95])
      .scale([90000])
      .translate([dimensions.width / 2, mapExtent / 2]);

    const geoPath = d3.geoPath().projection(projection);

    const windowPaths = DISTRICTS.map(geoPath);

    return windowPaths;
  }, [dimensions]);

  useEffect(() => {
    setDistrictList(
      districtPaths.map((path, i) => {
        const curDistrict = DISTRICTS[i].properties.GIS_Featur;

        if (Object.keys(data).length === 0) {
          return null;
        }

        const curDistrictData = data.find(
          (district) => district.name === curDistrict
        )["data"];

        return (
          <Path
            key={curDistrict}
            d={path}
            stroke={COLORS.greyLight}
            strokeOpacity={0.3}
            strokeWidth={0.6}
            fill={COLORS.greyLight}
            fill={colorize(curDistrictData[stat])}
            opacity={1}
          />
        );
      })
    );
  }, [data]);

  if (Object.keys(data).length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Svg width={dimensions.width} height={dimensions.height / 2}>
          {districtList.map((x) => x)}
        </Svg>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  svg: {},
});

export default Map;
