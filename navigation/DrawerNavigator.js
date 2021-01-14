import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  AchievementsStackNavigator,
  CreditsStackNavigator,
  DrawerContent,
  HomeStackNavigator,
  InputStackNavigator,
  LeaderboardStackNavigator,
  MainStackNavigator,
  NotificationsStackNavigator,
  SettingsStackNavigator,
} from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      {/* add screens here that u want to have drawer navigator functionality */}
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="Main" component={MainStackNavigator} />
      <Drawer.Screen name="Input" component={InputStackNavigator} />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStackNavigator}
      />
      <Drawer.Screen name="Leaderboard" component={LeaderboardStackNavigator} />
      <Drawer.Screen
        name="Achievements"
        component={AchievementsStackNavigator}
      />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      <Drawer.Screen name="Credits" component={CreditsStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
