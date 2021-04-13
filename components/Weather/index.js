import { isNilOrEmpty } from "ramda-adjunct";
import { propOr, pathOr } from "ramda";
import { View, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import moment from "moment";

import {
  ContainerView,
  ForcastDataList,
  ForcastDataWrapper,
  ForcastLocation,
  ForcastText,
  ForcastLocationTitle,
  ForcastItem,
  ForcastItemLabel,
  ForcastItemValue,
  ForcastTextDate,
  ForcastCurrentDate,
  Wrapper,
  ForcastItemSpace,
  ForcastItemCurrent,
} from "./styles";

function renderForecastItem(item, currentLocation, i) {
  if (isNilOrEmpty(item)) return null;
  const { date, day } = item;
  const { name, region } = currentLocation;
  const dateFormatted = moment(date).format("MMM DD");
  //next two days
  return (
    <ContainerView key={i}>
      <ForcastItem>
        <ForcastItemSpace>
          {name}, {region}{" "}
        </ForcastItemSpace>
      </ForcastItem>
      <ForcastItem>
        <ForcastTextDate> {dateFormatted}</ForcastTextDate>
      </ForcastItem>
      <>
        <ForcastItem>
          <>
            <ForcastItemLabel>Avg temp:</ForcastItemLabel>
            <ForcastItemValue>
              {propOr(null, "maxtemp_c", day)}&deg;
            </ForcastItemValue>
          </>
        </ForcastItem>
        <ForcastItem>
          <>
            <ForcastItemLabel>Humidity:</ForcastItemLabel>
            <ForcastItemValue>
              {propOr(null, "avghumidity", day)}%
            </ForcastItemValue>
          </>
        </ForcastItem>
        <ForcastItemCurrent>
          <ForcastItemLabel>Precip:</ForcastItemLabel>
          <ForcastItemValue>
            {propOr(null, "totalprecip_mm", day)}mm
          </ForcastItemValue>
        </ForcastItemCurrent>
      </>
    </ContainerView>
  );
}

const renderForecastData = (data, location) =>
  !isNilOrEmpty(data) ? (
    data.map((el, i) => renderForecastItem(el, location, i))
  ) : (
    <Text>No data</Text>
  );

const renderForecastLocation = (currentForcast, currentLocation) => {
  if (isNilOrEmpty(currentForcast) && isNilOrEmpty(currentLocation))
    return null;

  const { date, day } = currentForcast;
  const { name, region } = currentLocation;
  const dateFormatted = moment(date).format("MMM DD");

  //current day forecast
  return (
    <ForcastLocation>
      <ForcastLocationTitle>
        {name}, {region}
      </ForcastLocationTitle>
      <ForcastItemCurrent>
        <ForcastCurrentDate>{dateFormatted}</ForcastCurrentDate>
      </ForcastItemCurrent>
      <ForcastItemCurrent>
        <ForcastItemLabel>Avg temp:</ForcastItemLabel>
        <ForcastItemValue>
          {propOr(null, "maxtemp_c", day)}&deg;
        </ForcastItemValue>
      </ForcastItemCurrent>
      <ForcastItemCurrent>
        <ForcastItemLabel>Humidity:</ForcastItemLabel>
        <ForcastItemValue>{propOr(null, "avghumidity", day)}%</ForcastItemValue>
      </ForcastItemCurrent>
      <ForcastItemCurrent>
        <ForcastItemLabel>Precip:</ForcastItemLabel>
        <ForcastItemValue>
          {propOr(null, "totalprecip_mm", day)}mm
        </ForcastItemValue>
      </ForcastItemCurrent>
    </ForcastLocation>
  );
};

const Weather = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    //lat = 42.984924;
    //lon = -81.245277;
    const url =
      "http://api.weatherapi.com/v1/forecast.json?key=991bf756032c414280063701212303&q=42.94,-81.24&days=4&aqi=yes&alerts=no";
    const response = await fetch(url);
    const json = await response.json();
    const responseData = pathOr([], ["forecast", "forecastday"], json);
    const responseLocation = propOr(null, "location", json);
    setData(responseData);
    setLocation(responseLocation);
  }

  if (isNilOrEmpty(data) && isNilOrEmpty(location)) return null;

  const [firstItem, ...restOfData] = data;

  return (
    <View>
      <ForcastDataWrapper>
        {renderForecastLocation(firstItem, location)}
        <ForcastDataList>
          {renderForecastData(restOfData, location)}
        </ForcastDataList>
      </ForcastDataWrapper>
    </View>
  );
};

export default Weather;
