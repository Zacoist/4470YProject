import React from "react";
import { Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Block, Button, Text } from "expo-ui-kit";
import { AntDesign, Feather } from "@expo/vector-icons";

import AchievementsScreen from "../screens/AchievementsScreen";
import CreditsScreen from "../screens/CreditsScreen";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
/* add this to screen that need burger option */
// options={{
//           headerStyle: {
//             backgroundColor: "#56C568",
//           },
//           headerTintColor: "white",
//           headerLeft: () => (
//             // Hamburger Button
//             <Button
//               primary
//               padding
//               marginHorizontal
//               color="#56C568"
//               onPress={() => navigation.openDrawer()}
//             >
//               <Feather name="menu" color="white" size={20} />
//             </Button>
//           ),
//         }}

/* achievements stack */
const AchievementsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

/* credits stack */
const CreditsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Credits"
        component={CreditsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

/*home stack : title screen -> login || sign up */
const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        color="red"
      />
      {/* LogIn Screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
        }}
      />
      {/* SignUp Screen */}
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

/* input stack */
const InputStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Input"
        component={InputScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.navigate("Main")}
            >
              <Feather name="arrow-left" color="white" size={24} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

/* leaderboard stack */
const LeaderboardStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

/* main stack: main screen -> input */
const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="Input"
        component={InputScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

/* notifications stack */
const NotificationsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

/* settings stack */
const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#56C568",
          },
          headerTintColor: "white",
          headerLeft: () => (
            // Hamburger Button
            <Button
              primary
              padding
              marginHorizontal
              color="#56C568"
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" color="white" size={20} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

//Contents of drawer
const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Block backgroundColor="#56C568">
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 200,
            height: 200,
            alignItems: "center",
          }}
        />
        {/* username */}
        <Text title style={{ color: "#FFFFFF", padding: 10 }}>
          Firstname Lastname
        </Text>
      </Block>
      <DrawerItem
        label="Home"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Main")}
        icon={() => <AntDesign name="home" color="black" size={16} />}
      />
      <DrawerItem
        label="Input"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Input")}
        icon={() => <Feather name="plus-square" color="black" size={16} />}
      />
      <DrawerItem
        label="Notifications"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Notifications")}
        icon={() => <AntDesign name="notification" color="black" size={16} />}
      />
      <DrawerItem
        label="Leaderboard"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Leaderboard")}
        icon={() => <AntDesign name="database" color="black" size={16} />}
      />
      <DrawerItem
        label="Achievements"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Achievements")}
        icon={() => <AntDesign name="Trophy" color="black" size={16} />}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => <AntDesign name="setting" color="black" size={16} />}
      />
      <DrawerItem
        label="Sign Out"
        labelStyle={{ color: "#000000" }}
        onPress={() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }],
            })
          );
        }}
        icon={() => <AntDesign name="logout" color="black" size={16} />}
      />
      <DrawerItem
        label="Credits"
        labelStyle={{ color: "#000000" }}
        onPress={() => props.navigation.navigate("Credits")}
        icon={() => <AntDesign name="github" color="black" size={16} />}
      />
    </DrawerContentScrollView>
  );
};

export {
  AchievementsStackNavigator,
  CreditsStackNavigator,
  DrawerContent,
  HomeStackNavigator,
  InputStackNavigator,
  LeaderboardStackNavigator,
  MainStackNavigator,
  NotificationsStackNavigator,
  SettingsStackNavigator,
};
