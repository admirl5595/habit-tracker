import React, { useContext } from "react";
import Layout from "./Layout";
import Form from "../components/new-habits/Form";
import HabitsContext from "../config/HabitsContext";
import { scheduleHabitReminders } from "../config/notifications-config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getHabits, createHabit } from "../config/crud-operations";

const AddHabit = ({ navigation }) => {
  // data and function from context
  const { setHabits } = useContext(HabitsContext);

  const addHabit = async (newHabitInfo) => {
    const res = await createHabit(newHabitInfo);

    // add habit to context with id from firebase response
    if (res) {
      getHabits(setHabits);

      // convert bool list to list of days of week

      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];

      // turn bool list into list of day strings
      let dayOfWeekStrings = newHabitInfo.dayOfWeek.map((bool, index) =>
        bool ? days[index] : null
      );

      // remove null values after mapping
      dayOfWeekStrings = dayOfWeekStrings.filter((value) => value !== null);

      // send list of days and reminder time and set scheduled reminder
      const notificationIds = await scheduleHabitReminders(
        dayOfWeekStrings,
        newHabitInfo.time,
        newHabitInfo.name
      );

      // store notification id's for new habit (habitId: notificationIds)
      try {
        await AsyncStorage.setItem(res.id, JSON.stringify(notificationIds));
      } catch (e) {
        // error
        console.error(e);
      }
    }

    // redirect to dailyhabits
    navigation.navigate("DailyHabits");
  };

  return (
    <Layout navigation={navigation}>
      <Form onSubmit={(newHabitInfo) => addHabit(newHabitInfo)} />
    </Layout>
  );
};

export default AddHabit;
