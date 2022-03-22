import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import Layout from "./Layout";
import Form from "../components/new-habits/Form";
import { addDoc, collection } from "firebase/firestore";
import HabitsContext from "../config/HabitsContext";

import { db, auth } from "../firebase-config";
import { schedulePushNotification } from "../config/notifications-config";

const AddHabit = ({ navigation }) => {
  const user = auth.currentUser;

  // data and function from context
  const { habits, setHabits } = useContext(HabitsContext);

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  const addHabit = async (newHabitInfo) => {
    // add key value pairs to the new habit and declare completed days array (list of dates)
    const newHabit = { ...newHabitInfo, completedDays: [] };

    // adds document to user's habit collection (autoId)
    const res = await addDoc(userHabitCollectionRef, newHabit);

    // add habit to context with id from firebase response
    if (res) {
      setHabits([...habits, { ...newHabit, id: res.id }]);

      // schedule notifications for this habit

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
      await schedulePushNotification(
        dayOfWeekStrings,
        newHabitInfo.time,
        newHabitInfo.name
      );
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
