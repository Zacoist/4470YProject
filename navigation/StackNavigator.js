import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../screens/HomePage";
import MainScreen from "../screens/MainScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#56C568",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
