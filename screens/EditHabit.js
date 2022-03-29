import React, { useContext } from "react";
import Form from "../components/new-habits/Form";
import { updateDoc, doc } from "firebase/firestore";
import HabitsContext from "../config/HabitsContext";

import { db, auth } from "../firebase-config";
import { editHabitReminders } from "../config/notifications-config";

import { getHabits } from "../config/crud-operations";

import AsyncStorage from "@react-native-async-storage/async-storage";

const EditHabit = ({ route, navigation }) => {
  const user = auth.currentUser;

  const { habit } = route.params;

  // data and function from context
  const { setHabits } = useContext(HabitsContext);

  const editHabit = async (updatedHabitInfo) => {
    // update name, dayOfWeek, color and time for this habit (keep completed)
    const updatedHabitFields = { ...updatedHabitInfo };

    const habitDoc = doc(db, "users", user.uid, "habits", habit.id);

    // adds document to user's habit collection (autoId)
    await updateDoc(habitDoc, updatedHabitFields);

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
    let dayOfWeekStrings = updatedHabitInfo.dayOfWeek.map((bool, index) =>
      bool ? days[index] : null
    );

    // remove null values after mapping
    dayOfWeekStrings = dayOfWeekStrings.filter((value) => value !== null);
    let oldNotificationIds = await AsyncStorage.getItem(habit.id);

    // send list of old notification ids to edit and new time
    // return new array of notification ids
    const notificationIds = await editHabitReminders(
      oldNotificationIds,
      updatedHabitFields.time
    );

    // store notification id's for new habit (habitId: notificationIds)
    try {
      // overwrite previous notification ids for this habit
      await AsyncStorage.setItem(habit.id, JSON.stringify(notificationIds));
    } catch (e) {
      // error
      console.error(e);
    }

    // redirect to dailyhabits
    navigation.navigate("DailyHabits");
  };

  return (
    <Form
      navigation={navigation}
      habitInfo={habit}
      onSubmit={(updatedHabitInfo) => editHabit(updatedHabitInfo)}
    />
  );
};

export default EditHabit;