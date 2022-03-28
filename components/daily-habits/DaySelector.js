import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./DaySelectorStyle";
import { primaryColor } from "../../config/theme/styles";

const DaySelector = ({ selectedDay, setSelectedDay }) => {
  const backgroundColor = primaryColor;

  // monday returns 0 etc.
  let dayNum = new Date().getDay();

  // days of week
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const backGroundColor = (day) => {
    let dayIndex = new Date().getDay();

    // set color to primary color if selected
    if (day === selectedDay) {
      return { backgroundColor: backgroundColor };
    }

    // set to red if it is day of week
    if (day === days[dayIndex]) {
      return { backgroundColor: "rgba(255, 0, 0, 0.6)" };
    }

    // white if neither
    return { backgroundColor: "#fff" };
  };

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
          <View style={[styles.btn, backGroundColor(day)]}>
            <FontAwesomeIcon size={30} icon={day[0]} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DaySelector;
