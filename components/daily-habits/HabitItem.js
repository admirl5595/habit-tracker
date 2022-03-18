import React from "react";

import { Text, View, TouchableOpacity } from "react-native";

import styles from "./HabitItemStyle";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HabitItem = ({ item, removeHabit }) => {
  // custom style for item chosen by user

  const backGroundColor = {
    backgroundColor: item.color,
  };

  return (
    <View style={[styles.habitContainer, backGroundColor]}>
      <FontAwesomeIcon size={40} icon={item.icon} />
      <Text style={styles.habitHeader}>{item.name}</Text>

      <TouchableOpacity onPress={() => removeHabit(item.id)}>
        <FontAwesomeIcon style={styles.removeBtn} size={25} icon="trash" />
      </TouchableOpacity>
    </View>
  );
};

export default HabitItem;
