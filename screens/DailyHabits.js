import React, { useEffect, useState, useContext } from "react";
import { View, Button, FlatList, ActivityIndicator } from "react-native";

import styles from "./DailyHabitsStyle";

import { db } from "../firebase-config";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/daily-habits/HabitItem";
import DaySelector from "../components/daily-habits/DaySelector";

import Layout from "./Layout";

import HabitsContext from "../config/HabitsContext";
import NoHabits from "../components/daily-habits/NoHabits";

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
    const newDisplayHabits = habitsCopy.filter(
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

    setHabits(userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    setIsLoading(false);
  };

  // remove habit by id
  const removeHabit = async (id) => {
    // collection(db, "users", user.uid, "habits");
    const habitDoc = doc(db, "users", user.uid, "habits", id);
    await deleteDoc(habitDoc);
    await getHabits();
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
              <HabitItem removeHabit={(id) => removeHabit(id)} item={item} />
            )}
          />
        )}
      </View>
    </Layout>
  );
};

export default DailyHabits;
