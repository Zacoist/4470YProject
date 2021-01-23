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

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    //variables
    fullname: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",

    //booleans for icon use
    check_nameInputChange: false,
    check_emailInputChange: false,

    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  //Set fullname var and checks if its valid
  const nameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        fullname: val,
        check_nameInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullname: val,
        check_nameInputChange: false,
      });
    }
  };

  //Set address var and checks if its valid
  const addressInputChange = (val) => {
    setData({
      ...data,
      address: val,
    });
  };

  //Set email var and checks if its valid
  const emailInputChange = (val) => {
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

  //Set confirm_password var
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  //Function that changes the password from astericks for the password
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  //Function that changes the password from astericks for the confirm password
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const writeUserData = (userID, fullname, address, email, password) => {
    firebase
      .database()
      .ref("users/" + userID)
      .set({
        fullname: fullname,
        address: address,
        email: email,
        password: password,
      });
  };

  return (
    <View style={(styles.container, styles.footer)}>
      {/* fullname input */}
      <Text style={styles.text_footer}>Fullname</Text>
      <View style={styles.action}>
        <AntDesign name="user" color="#05375a" size={30} />
        <TextInput
          placeholder="Firstname Lastname"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => nameInputChange(val)}
        />
        {data.check_nameInputChange ? (
          <Feather name="check-circle" color="green" size={20} />
        ) : null}
      </View>

      {/* address input */}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Address
      </Text>
      <View style={styles.action}>
        <Feather name="map-pin" color="#05375a" size={30} />
        <TextInput
          placeholder="Select a location"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => addressInputChange(val)}
        />
        <Feather name="map" color="grey" size={20} />
      </View>

      {/* email text input  */}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Email
      </Text>
      <View style={styles.action}>
        <AntDesign name="mail" color="#05375a" size={30} />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => emailInputChange(val)}
        />
        {data.check_emailInputChange ? (
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
      {/* confirm password input */}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Confirm Password
      </Text>
      <View style={styles.action}>
        <AntDesign name="lock" color="#05375a" size={30} />
        <TextInput
          placeholder="Confirm Your Password"
          secureTextEntry={data.confirm_secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handleConfirmPasswordChange(val)}
        />
        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
          {data.confirm_secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>

      {/* sign in & sign out buttons */}
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password)
              .then(() => {
                //login
                firebase
                  .auth()
                  .signInWithEmailAndPassword(data.email, data.password)
                  .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    //write to database
                    writeUserData(
                      firebase.auth().currentUser.uid,
                      data.fullname,
                      data.address,
                      data.email,
                      data.password
                    );
                    console.log("User account created & signed in!");
                    //go to main screen when finish signing up
                    navigation.navigate("Main");
                  })
                  //failed to login
                  .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error.code);
                  });
              })
              //failed to sign up
              .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                  console.log("That email address is already in use!");
                }

                if (error.code === "auth/invalid-email") {
                  console.log("That email address is invalid!");
                }
                console.error(error);
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
            Sign Up
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
            Already have an account? Log In
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
    marginTop: 10,
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

export default SignUpScreen;
