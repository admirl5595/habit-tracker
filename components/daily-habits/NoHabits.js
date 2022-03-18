import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const NoHabits = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>No habits</Text>

      <FontAwesomeIcon color="lightblue" size={200} icon="face-grin-tears" />
    </View>
  );
};

export default NoHabits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
  },
});
