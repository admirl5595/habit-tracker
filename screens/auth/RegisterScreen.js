import {
  Keyboard,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";

import styles from "./AuthScreensStyle";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Resize logo when keyboard is open to be able to read all entries
  const [imageSize, setImageSize] = useState({ width: 230, height: 230 });
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setImageSize({ width: 100, height: 100 });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setImageSize({ width: 230, height: 230 });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // get user information
        const user = auth.currentUser;

        // store habits and user id in user collection
        const userData = {
          uid: user.uid,
          email: email,
        };

        // create new document in users collection with user id as name
        setDoc(doc(db, "users", user.uid), userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={{
          width: imageSize.width,
          height: imageSize.height,
          margin: 20,
          borderRadius: 50,
        }}
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
