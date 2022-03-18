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
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

import styles from "./AuthScreensStyle";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
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

      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btnText}>Don't have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
