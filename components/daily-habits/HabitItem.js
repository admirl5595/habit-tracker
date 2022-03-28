import React from "react";

import { Text, View, TouchableOpacity } from "react-native";

import styles from "./HabitItemStyle";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HabitItem = ({ item, removeHabit, selectedDay, completeHabit, navigation }) => {
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

    <TouchableOpacity onPress={() => navigation.navigate('EditHabit', { habit: item })}>
<View style={[styles.habitContainer, backGroundColor]}>
      <FontAwesomeIcon size={40} icon={item.icon} />
      <Text style={styles.habitHeader}>{item.name}</Text>
      <TouchableOpacity onPress={() => completeHabit(item.id)}>
        {isCurrentDay ? (
          <FontAwesomeIcon
            size={33}
            style={styles.completeBtn}
            icon="circle-check"
          />
        ) : null}
      </TouchableOpacity>
    </View>
    </TouchableOpacity>

    
  );
};

export default HabitItem;
