import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

import styles from "./AuthScreensStyle";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        return userCredential.user.updateProfile({
          displayName: email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.img}
        source={require("../../config/images/app-logo.png")}
      />
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(passwordConfirm) =>
            setPasswordConfirm(passwordConfirm)
          }
        />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.btn}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
