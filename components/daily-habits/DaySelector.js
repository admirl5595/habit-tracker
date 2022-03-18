import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./DaySelectorStyle";
import { primaryColor } from "../../config/theme/styles";

const DaySelector = ({ selectedDay, setSelectedDay }) => {
  const backgroundColor = primaryColor;

  // monday returns 0 etc.
  const dayNum = new Date().getDay();

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

  // show 7 days from today (day = friday, saturday, sunday, ..., thursday)

  let part1 = days.splice(dayNum-1, dayNum )
  let part2 = days.splice(0, dayNum- 1 )

  days = [...part1, ...part2]

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
