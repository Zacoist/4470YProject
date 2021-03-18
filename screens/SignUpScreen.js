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
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "../firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

//Function adds the user's ID, name, address, email and password into the database
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

//Function adds the weekly input for the user
  const writeWeekData = (userID) => {
    firebase
      .database()
      .ref("users/" + userID + "/weekly_inputs")
      .set({
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      });
  };

  //Function adds the weekly input for the user
  const writeCompostData = (userID) => {
    firebase
      .database()
      .ref("users/" + userID + "/compostdata")
      .set({
        totalcomposts: 0,
      });
  };

  return (
      <KeyboardAwareScrollView>
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

      {/* location input */}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Location
      </Text>
        <DropDownPicker
            items={[
                {label: 'Airport', value: 'Airport'},
                {label: 'Argyle', value: 'Argyle'},
                {label: 'Bostwick', value: 'Bostwick'},
                {label: 'Bradley', value: 'Bradley'},
                {label: 'Byron', value: 'Byron'},
                {label: 'Carling', value: 'Carling'},
                {label: 'Central London', value: 'Central London'},
                {label: 'Crumlin', value: 'Crumlin'},
                {label: 'East London', value: 'East London'},
                {label: 'Fanshawe', value: 'Fanshawe'},
                {label: 'Fow Hollow', value: 'Fow Hollow'},
                {label: 'Glanworth', value: 'Glanworth'},
                {label: 'Glen Cairn', value: 'Glen Cairn'},
                {label: 'Hamilton Road', value: 'Hamilton Road'},
                {label: 'Highbury', value: 'Highbury'},
                {label: 'Highland', value: 'Highland'},
                {label: 'Huron Heights', value: 'Huron Heights'},
                {label: 'Hyde Park', value: 'Hyde Park'},
                {label: 'Jackson', value: 'Jackson'},
                {label: 'Lambeth', value: 'Lambeth'},
                {label: 'Longwoods', value: 'Longwoods'},
                {label: 'Masonville', value: 'Masonville'},
                {label: 'Medway', value: 'Medway'},
                {label: 'North London', value: 'North London'},
                {label: 'Oakridge', value: 'Oakridge'},
                {label: 'Old Victoria', value: 'Old Victoria'},
                {label: 'River Bend', value: 'River Bend'},
                {label: 'Sharon Creek', value: 'Sharon Creek'},
                {label: 'South London', value: 'South London'},
                {label: 'Southcrest', value: 'Southcrest'},
                {label: 'Stoney Creek', value: 'Stoney Creek'},
                {label: 'Stoneybrook', value: 'Stoneybrook'},
                {label: 'Sunningdale', value: 'Sunningdale'},
                {label: 'Talbot', value: 'Talbot'},
                {label: 'Tempo', value: 'Tempo'},
                {label: 'Uplands', value: 'Uplands'},
                {label: 'West London', value: 'West London'},
                {label: 'Westminister', value: 'Westminister'},
                {label: 'Westmount', value: 'Westmount'},
                {label: 'White Oaks', value: 'White Oaks'},
                {label: 'Woodhull', value: 'Woodhull'},
            ]}
            defaultValue={'Airport'}
            containerStyle={{height: 50}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(val) => addressInputChange(val.value)}
        />

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
                    writeWeekData(firebase.auth().currentUser.uid);
                    writeCompostData(firebase.auth().currentUser.uid);
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
          onPress={() => navigation.navigate("Login")}
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
       </KeyboardAwareScrollView>

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
