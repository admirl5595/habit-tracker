import React from "react";

import { Text, View, TouchableOpacity } from "react-native";

import styles from "./HabitItemStyle";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HabitItem = ({ item, removeHabit, selectedDay, completeHabit }) => {
  let daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let dayIndex = new Date().getDay();

  // check if selected day is current day
  let isCurrentDay = selectedDay === daysOfWeek[dayIndex] ? true : false;

  // custom style for item chosen by user
  const backGroundColor = {
    backgroundColor: item.color,
  };

  return (
    <View style={[styles.habitContainer, backGroundColor]}>
      <FontAwesomeIcon size={40} icon={item.icon} />
      <Text style={styles.habitHeader}>{item.name}</Text>

      <TouchableOpacity onPress={() => completeHabit(item.id)}>
        {isCurrentDay ? (
          <FontAwesomeIcon
            size={30}
            style={styles.completeBtn}
            icon="circle-check"
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeHabit(item.id)}>
        <FontAwesomeIcon style={styles.removeBtn} size={25} icon="trash" />
      </TouchableOpacity>
    </View>
  );
};

export default HabitItem;
