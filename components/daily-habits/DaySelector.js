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

  // show 7 days from today (day = friday, saturday, sunday, ..., thursday)

  // note: sunday has index 0, saturday has index 6

  let part1 = days.splice(dayNum, days.length - dayNum);
  let part2 = days.splice(0, dayNum);

  days = [...part1, ...part2];

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
