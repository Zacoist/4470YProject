import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator } from "./StackNavigator";

import HomePage from "../screens/HomePage";
import MainScreen from "../screens/MainScreen";
import InputScreen from "../screens/InputScreen";
import Notification from "../screens/Notification";
import LeaderBoard from "../screens/LeaderBoard";
import Achievements from "../screens/Achievements";
import Setting from "../screens/Setting";
import Credit from "../screens/Credit";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="Main Screen" component={MainStackNavigator} />
      <Drawer.Screen name="InputScreen" component={InputScreen} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="LeaderBoard" component={LeaderBoard} />
      <Drawer.Screen name="Achievements" component={Achievements} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Credit" component={Credit} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
