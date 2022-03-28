import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// setTime: set state function for parents time state
// time: time state for parent
export default function TimeInput({ time, setTime }) {
  const [hours, setHours] = useState(time.getHours());
  const [minutes, setMinutes] = useState(time.getMinutes());

  const incrementHours = () => {
    const newHour = hours + 1 >= 24 ? 0 : hours + 1;

    setHours(newHour);

    // make a copy of time state
    let timeCopy = new Date(time.getTime());
    timeCopy.setHours(newHour);

    setTime(timeCopy);
  };
  const decrementHours = () => {
    const newHour = hours - 1 < 0 ? 23 : hours - 1;

    setHours(newHour);

    // make a copy of time state
    let timeCopy = new Date(time.getTime());
    timeCopy.setHours(newHour);

    setTime(timeCopy);
  };

  const incrementMinutes = () => {
    const newMinute = minutes + 1 >= 60 ? 0 : minutes + 1;

    setMinutes(newMinute);

    // make a copy of time state
    let timeCopy = new Date(time.getTime());

    const hourCopy = timeCopy.getHours();

    timeCopy.setHours(hourCopy, newMinute);

    setTime(timeCopy);
  };
  const decrementMinutes = () => {
    const newMinute = minutes - 1 < 0 ? 59 : minutes - 1;

    setMinutes(newMinute);

    // make a copy of time state
    let timeCopy = new Date(time.getTime());

    const hourCopy = timeCopy.getHours();

    timeCopy.setHours(hourCopy, newMinute);

    setTime(timeCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeSetter}>
        <TouchableOpacity onPress={incrementHours}>
          <FontAwesomeIcon size={45} icon="caret-up" />
        </TouchableOpacity>
        <Text style={styles.text}>{hours < 10 ? "0" + hours : hours}</Text>
        <TouchableOpacity onPress={decrementHours}>
          <FontAwesomeIcon size={45} icon="caret-down" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>:</Text>
      <View style={styles.timeSetter}>
        <TouchableOpacity onPress={incrementMinutes}>
          <FontAwesomeIcon size={45} icon="caret-up" />
        </TouchableOpacity>
        <Text style={styles.text}>
          {minutes < 10 ? "0" + minutes : minutes}
        </Text>
        <TouchableOpacity onPress={decrementMinutes}>
          <FontAwesomeIcon size={45} icon="caret-down" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  timeSetter: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
