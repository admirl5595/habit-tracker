import React from "react";

import { Text, View } from "react-native";

import styles from "./HabitItemStyle";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HabitItem = ({ item }) => {
  return (
    <View style={styles.habitContainer}>
      <Text style={styles.habitHeader}>{item.name}</Text>
      <Text>
        {item.completedDays.map((day) =>
          day ? (
            <FontAwesomeIcon color="green" icon="t" /> // 't' er alias for faT
          ) : (
            <FontAwesomeIcon color="red" icon="f" />
          )
        )}
      </Text>
    </View>
  );
};

export default HabitItem;
