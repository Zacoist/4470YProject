import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./navigation/DrawerNavigator";

import firebase from "./firebase";

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

// firebase.database().ref("users/test").set({
//   highscore: 0,
// });

export default App;
