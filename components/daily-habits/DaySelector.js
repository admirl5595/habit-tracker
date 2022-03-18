import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./DaySelectorStyle";
import { primaryColor } from "../../config/theme/styles";

const DaySelector = ({ selectedDay, setSelectedDay }) => {
  const backgroundColor = primaryColor;

  // days of week
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
          <View
            style={[
              styles.btn,
              day === selectedDay
                ? { backgroundColor: backgroundColor } // color selected day button
                : { backgroundColor: "#fff" },
            ]}
          >
            <FontAwesomeIcon size={30} icon={day[0]} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DaySelector;
