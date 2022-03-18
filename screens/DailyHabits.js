import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList } from "react-native";

import styles from "./DailyHabitsStyle";

import { db } from "../firebase-config";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/daily-habits/HabitItem";
import DaySelector from "../components/daily-habits/DaySelector";

import Layout from "./Layout";

const DailyHabits = ({ navigation }) => {
  // current user
  const user = auth.currentUser;

  // each user has a user document has an id (uid)
  // each user also has a habits collection related to them (users/userId/habits)

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  const [habitsData, setHabitsData] = useState([]);

  // monday returns 0 etc.
  const dayNum = new Date().getDay();
  const days = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday",
  };

  // set day string using corresponding day number
  const [selectedDay, setSelectedDay] = useState(days[dayNum]);

  // habits filtered by day selector
  const [displayHabits, setDisplayHabits] = useState([]);

  // set displayHabits state to habits matching selected day
  const filterHabits = () => {
    const habitsDataCopy = [...habitsData];

    // return list of habits
    const newDisplayHabits = habitsDataCopy.filter(
      (habit) =>
        habit.dayOfWeek.filter(
          (dayBool, index) => days[index] === selectedDay && dayBool
        ).length !== 0
    );

    setDisplayHabits(newDisplayHabits);
  };

  // get habit documents
  const getHabits = async () => {
    const userHabits = await getDocs(userHabitCollectionRef);

    setHabitsData(
      userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // temporary create function
  const addHabit = async () => {
    const dummyHabit = {
      name: "Go fishin'",
      completedDays: [true, true, false, false],
      color: "rgba(235,169,95,1)",
      icon: "fish-fins", // fontawesome icon
      dayOfWeek: [false, false, false, false, true, true, true],
    };
    // adds document to user's habit collection (autoId)
    await addDoc(userHabitCollectionRef, dummyHabit);
    // should we get habits from database or change state locally?
    await getHabits();
  };

  // remove habit by id
  const removeHabit = async (id) => {
    // collection(db, "users", user.uid, "habits");
    const habitDoc = doc(db, "users", user.uid, "habits", id);
    await deleteDoc(habitDoc);
    await getHabits();
  };

  // filter habits when changing selected day and when habitsdata changes (CRUD)
  useEffect(filterHabits, [selectedDay, habitsData]);

  // get habits from firestore
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Layout navigation={navigation}>
      <DaySelector
        selectedDay={selectedDay}
        setSelectedDay={(day) => setSelectedDay(day)}
      />
      <View style={styles.container}>
        <Button
          title="Log out"
          onPress={() =>
            signOut(auth)
              .then(() => {
                /* Sign-out successful */
              })
              .catch((error) => {
                // An error happened
              })
          }
        />

        <FlatList
          style={{ width: "100%" }}
          data={displayHabits}
          renderItem={({ item }) => (
            <HabitItem removeHabit={(id) => removeHabit(id)} item={item} />
          )}
        />
      </View>
      <Button title="make dummy habit" onPress={addHabit} />
    </Layout>
  );
};

export default DailyHabits;
