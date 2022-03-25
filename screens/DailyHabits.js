import React, { useEffect, useState, useContext } from "react";
import { View, Button, FlatList, ActivityIndicator } from "react-native";

import styles from "./DailyHabitsStyle";

import { db } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/daily-habits/HabitItem";
import DaySelector from "../components/daily-habits/DaySelector";

import Layout from "./Layout";

import HabitsContext from "../config/HabitsContext";
import NoHabits from "../components/daily-habits/NoHabits";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { cancelHabitReminders } from "../config/notifications-config";

const DailyHabits = ({ navigation }) => {
  // current user
  const user = auth.currentUser;

  const { habits, setHabits } = useContext(HabitsContext);

  // each user has a user document has an id (uid)
  // each user also has a habits collection related to them (users/userId/habits)

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  // monday returns 0 for sunday etc.
  const dayNum = new Date().getDay();
  let days = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    0: "sunday",
  };

  // set day string using corresponding day number
  const [selectedDay, setSelectedDay] = useState(days[dayNum]);

  const [isLoading, setIsLoading] = useState(true);

  // habits filtered by day selector
  const [displayHabits, setDisplayHabits] = useState([]);

  // set displayHabits state to habits matching selected day
  const filterHabits = () => {
    if (!habits) return; // handles habits=null as initial value

    const habitsCopy = [...habits];

    // note: change dayOfWeek to list of days
    let days = {
      0: "monday",
      1: "tuesday",
      2: "wednesday",
      3: "thursday",
      4: "friday",
      5: "saturday",
      6: "sunday",
    };

    // return list of habits
    let newDisplayHabits = habitsCopy.filter(
      (habit) =>
        habit.dayOfWeek.filter(
          (dayBool, index) => days[index] === selectedDay && dayBool
        ).length !== 0
    );

    // remove habits that are already completed for the selected day

    // set start of week date
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() - new Date().getDay());

    console.log("start of week: " + selectedDate);

    let daysOfWeek = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    // add number of days since start of week
    selectedDate.setDate(selectedDate.getDate() + daysOfWeek[selectedDay]);

    console.log("selected date: " + selectedDate);

    const selectedDateYear = selectedDate.getFullYear();
    const selectedDateMonth = selectedDate.getMonth();
    const selectedDateDay = selectedDate.getDay();

    newDisplayHabits = newDisplayHabits.filter((habit) => {
      let completedDays = habit.completedDays;

      for (let i = 0; i < completedDays.length; i++) {
        let date = completedDays[i].toDate();
        if (
          date.getFullYear() === selectedDateYear &&
          date.getMonth() === selectedDateMonth &&
          date.getDay() === selectedDateDay
        ) {
          return false;
        }
      }

      return true;
    });

    setDisplayHabits(newDisplayHabits);
  };

  // get habit documents
  const getHabits = async () => {
    const userHabits = await getDocs(userHabitCollectionRef);

    setHabits(userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    setIsLoading(false);
  };

  // remove habit by id
  const removeHabit = async (habitId) => {
    const habitDoc = doc(db, "users", user.uid, "habits", habitId);

    await deleteDoc(habitDoc);

    let notificationIds;

    try {
      notificationIds = await AsyncStorage.getItem(habitId);

      notificationIds = notificationIds ? JSON.parse(notificationIds) : null;

      cancelHabitReminders(notificationIds);
    } catch (e) {
      console.log("error occured when fetching local data");
      console.log(e);
    }

    await getHabits();
  };

  // complete a habit (only for todays date)
  const completeHabit = async (id) => {
    const user = auth.currentUser;

    const habitRef = doc(db, "users", user.uid, "habits", id);

    let habitDoc = await getDoc(habitRef);

    let habit = habitDoc.data();

    // get old completed days array
    let oldCompletedDays = habit.completedDays;

    // should check if completed days already contains todays date

    // append todays date
    let newCompletedDays = [...oldCompletedDays, new Date()];

    await updateDoc(habitRef, { completedDays: newCompletedDays });
    getHabits();
  };

  // filter habits when changing selected day and when habitsdata changes (CRUD)
  useEffect(filterHabits, [selectedDay, habits]);

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
                setHabits(null); // clear context
              })
              .catch((error) => {
                // An error happened
              })
          }
        />
        {isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
        {displayHabits.length === 0 && !isLoading ? (
          <NoHabits />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={displayHabits}
            renderItem={({ item }) => (
              <HabitItem
                removeHabit={(id) => removeHabit(id)}
                selectedDay={selectedDay}
                item={item}
                completeHabit={(id) => completeHabit(id)}
              />
            )}
          />
        )}
      </View>
    </Layout>
  );
};

export default DailyHabits;
