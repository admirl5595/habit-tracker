import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import Layout from "./Layout";
import { addDoc, collection } from "firebase/firestore";
import HabitsContext from "../config/HabitsContext";

import { db, auth } from "../firebase-config";

const AddHabit = ({ navigation }) => {
  const user = auth.currentUser;

  // data and function from context
  const { habits, setHabits } = useContext(HabitsContext);

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  // temporary create function
  const addHabit = async () => {
    const dummyHabit = {
      name: "Go running 2",
      completedDays: [true, true, false, false],
      color: "green",
      icon: "person-running", // fontawesome icon
      dayOfWeek: [false, false, false, true, true, true, true],
    };
    // adds document to user's habit collection (autoId)
    const res = await addDoc(userHabitCollectionRef, dummyHabit);

    // add habit to context with id from firebase response
    if (res) setHabits([...habits, { ...dummyHabit, id: res.id }]);

    // redirect to dailyhabits
    navigation.navigate("DailyHabits");
  };

  return (
    <Layout navigation={navigation}>
      <Text>Add habit</Text>
      <Button onPress={addHabit} title="add dummy habit" />
    </Layout>
  );
};

export default AddHabit;
