import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { theme } from "../../config/theme/styles";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { primaryColor } from "../../config/theme/styles";

import DaysSelector from "../new-habits/DaysSelector";

import styles from "./FormStyles";

import { schedulePushNotification } from "../../config/notifications-config";

import TimeInput from "./TimeInput";

// onSubmit: either create or edit habit
// habitInfor: previous habit info (null when creating a new one)

const Form = ({ onSubmit, habitInfo }) => {
  const [errorMessage, setErrorMessage] = useState("");

  // habit name
  const [name, setName] = useState(habitInfo ? habitInfo.name : "");

  const icons = [
    "person-running",
    "person-swimming",
    "fish-fins",
    "futbol",
    "skiing",
    "dumbbell",
    "keyboard",
  ];

  const [icon, setIcon] = useState(habitInfo ? habitInfo.icon : "");

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // initial days selection
  const defaultDays = habitInfo
    ? habitInfo.dayOfWeek
    : [false, false, false, false, false, false, false];

  // turn bool list into list of day strings
  let defaultDaysStrings = defaultDays.map((bool, index) =>
    bool ? days[index] : null
  );

  // remove null values after mapping
  defaultDaysStrings = defaultDaysStrings.filter((value) => value !== null);

  const [selectedDays, setSelectedDays] = useState(defaultDaysStrings);

  // colors the user can assign to a habit
  const colors = [
    "rgba(127, 208, 245, 1)",
    "rgba(111, 237, 109, 1)",
    "rgba(173, 109, 237, 1)",
    "rgba(245, 91, 91, 1)",
    "rgba(227, 232, 86, 1)",
  ];

  const [color, setColor] = useState(habitInfo ? habitInfo.color : null);

  // toggle the inclusion of a day in the selected days
  const toggleDay = (day) => {
    let selectedDaysCopy = [...selectedDays];

    if (selectedDaysCopy.includes(day)) {
      selectedDaysCopy = selectedDaysCopy.filter((prevDay) => prevDay !== day);
    } else {
      selectedDaysCopy.push(day);
    }

    setSelectedDays(selectedDaysCopy);
  };

  const handleSubmit = () => {
    // verify name
    if (!(1 <= name.length && name.length <= 25)) {
      setErrorMessage("name invalid");
      return;
    }

    // verify icon
    if (!icon) {
      setErrorMessage("choose an icon");
      return;
    }

    // verify frequency (at least one day)
    if (selectedDays.length === 0) {
      setErrorMessage("pick at least one day");
      return;
    }

    // verify color
    if (!color) {
      setErrorMessage("pick a color");
      return;
    }

    setErrorMessage("");

    // convert list of days to bool list
    const days = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };

    const selectedDaysCopy = [...selectedDays];

    let dayOfWeek = [false, false, false, false, false, false, false];

    for (let i = 0; i < selectedDaysCopy.length; i++) {
      // index corresponding to day of week
      let index = days[selectedDaysCopy[i]];

      dayOfWeek[index] = true;
    }

    const newHabitInfo = {
      name: name,
      icon: icon,
      dayOfWeek: dayOfWeek,
      color: color,
      time: time,
    };

    // pass habit information to submit funciton (add or edit)
    onSubmit(newHabitInfo);
  };

  // create default time set to midnight
  const defaultTime = new Date();
  defaultTime.setHours(0, 0, 0, 0);

  const [time, setTime] = useState(defaultTime);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          value={name}
          style={styles.textInput}
          onChangeText={setName}
          placeholder="Habit name"
        />

        <Text style={styles.inputLabel}>Icon</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.iconsContainer}
        >
          {icons.map((iconOption) => (
            <TouchableOpacity
              key={iconOption}
              style={[styles.icon]}
              onPress={() => setIcon(iconOption)}
            >
              <FontAwesomeIcon
                color={iconOption === icon ? primaryColor : "gray"}
                size={50}
                key={iconOption}
                icon={iconOption}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.inputLabel}>Frequency</Text>
        <DaysSelector
          selectedDays={selectedDays}
          setSelectedDays={(day) => toggleDay(day)}
        />

        <Text style={styles.inputLabel}>Color</Text>
        <View style={styles.colorSelectorContainer}>
          {colors.map((colorOption) => (
            <TouchableOpacity
              key={colorOption}
              style={[styles.colorSelector, { backgroundColor: colorOption }]}
              onPress={() => {
                setColor(colorOption);
              }}
            >
              {color === colorOption ? (
                <FontAwesomeIcon color="#fff" size={30} icon="circle-check" />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>Reminder</Text>
        <TimeInput time={time} setTime={setTime} />
      </ScrollView>
      <TouchableOpacity style={theme.btnContainer} onPress={handleSubmit}>
        <Text style={theme.btnText}>
          {habitInfo ? "Edit habit" : "Add habit"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Form;
