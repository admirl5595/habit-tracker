import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    onAuthStateChanged(auth, (user) =>
      this.props.navigation.navigate(user ? "App" : "Auth")
    );
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
