import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";

import styles from "./DailyHabitsStyle";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getHabits,
  removeHabit,
  completeHabit,
} from "../config/crud-operations";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/daily-habits/HabitItem";
import DaySelector from "../components/daily-habits/DaySelector";

import Layout from "./Layout";

import HabitsContext from "../config/HabitsContext";
import NoHabits from "../components/daily-habits/NoHabits";

const DailyHabits = ({ navigation }) => {
  const { habits, setHabits } = useContext(HabitsContext);

  // each user has a user document has an id (uid)
  // each user also has a habits collection related to them (users/userId/habits)

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

  // filter habits when changing selected day and when habitsdata changes (CRUD)
  useEffect(filterHabits, [selectedDay, habits]);

  // get habits from firestore
  useEffect(() => {
    getHabits(setHabits);
    setIsLoading(false);
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
          <>
            <Image
              style={{
                marginTop: 80,
                width: 250,
                height: 250,
                margin: 20,
                borderRadius: 50,
              }}
              source={require("../config/images/app-logo.png")}
              accessibilityLabel={"Logo of man running"}
            />
            <Text>No habits</Text>
          </>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={displayHabits}
            renderItem={({ item }) => (
              <HabitItem
                navigation={navigation}
                removeHabit={(id) => {
                  removeHabit(id);
                  getHabits(setHabits);
                }}
                selectedDay={selectedDay}
                item={item}
                completeHabit={(id) => {
                  completeHabit(id);
                  getHabits(setHabits);
                }}
              />
            )}
          />
        )}
      </View>
    </Layout>
  );
};

export default DailyHabits;
