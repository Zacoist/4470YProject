import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import firebase from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    //variables
    email: "",
    password: "",

    //booleans for icon use
    check_textInputChange: false,

    secureTextEntry: true,
  });

  //Set email var and checks if its valid
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  //Set password var
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  //Function that changes the password from astericks for the password
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    /* email text input */
    <View style={(styles.container, styles.footer)}>
      <Text style={styles.text_footer}>Email</Text>
      <View style={styles.action}>
        <AntDesign name="mail" color="#05375a" size={30} />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
        />
        {data.check_textInputChange ? (
          <Feather name="check-circle" color="green" size={20} />
        ) : null}
      </View>

      {/* password text input */}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Password
      </Text>
      <View style={styles.action}>
        <AntDesign name="lock" color="#05375a" size={30} />
        <TextInput
          placeholder="Your Password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={{ color: "#7EC0EE", marginTop: 15 }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      {/* sign in & sign out buttons */}
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            firebase
              .auth()
              .signInWithEmailAndPassword(data.email, data.password)
              .then((userCredential) => {
                // Signed in
                console.log("SIGNED IN");
                //go to main screen when finish logging in
                navigation.navigate("Main");
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code);
              })
          }
          style={[
            styles.signIn,
            {
              borderColor: "#56C568",
              borderWidth: 1,
              marginTop: 15,
              backgroundColor: "#56C568",
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "white",
              },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={[
            styles.signIn,
            {
              borderColor: "#56C568",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#56C568",
              },
            ]}
          >
            Don't have an account yet? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 5,
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 18,
  },
  text_footer: {
    fontSize: 18,
    color: "#05375a",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
