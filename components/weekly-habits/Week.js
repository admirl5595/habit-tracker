import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Week() {
  const lastWeek = () => {
    return 1;
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={lastWeek} style={styles.arrow}>
          <FontAwesomeIcon size={30} icon="caret-left" />
        </TouchableOpacity>
        <Text style={styles.arrow}>Week</Text>
        <TouchableOpacity style={styles.arrow}>
          <FontAwesomeIcon size={30} icon="caret-right" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center"
  },
  iconRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
});