import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import styles from "./AuthScreensStyle";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert("Invalid email or password!");
      console.log(error.message);
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

      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
