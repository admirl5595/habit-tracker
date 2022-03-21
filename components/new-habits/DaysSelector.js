import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "../daily-habits/DaySelectorStyle";
import { primaryColor } from "../../config/theme/styles";

const DaysSelector = ({ selectedDays, setSelectedDays }) => {
  const backgroundColor = primaryColor;

  // monday returns 0 etc.
  let dayNum = new Date().getDay();

  // days of week
  let days = [
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
        <TouchableOpacity key={day} onPress={() => setSelectedDays(day)}>
          <View
            style={[
              styles.btn,
              selectedDays.includes(day)
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

export default DaysSelector;
