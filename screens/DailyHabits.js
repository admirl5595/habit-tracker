import React, { useEffect, useState, useContext } from "react";
import { View, Button, FlatList } from "react-native";

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

  // monday returns 1 etc.
  const dayNum = new Date().getDay();
  const days = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    7: "sunday",
  };
  // set day string using corresponding day number
  const [selectedDay, setSelectedDay] = useState(days[dayNum]);

  // habits filtered by day selector
  const [displayHabits, setDisplayHabits] = useState([]);

  // set displayHabits state to habits matching selected day
  const filterHabits = () => {
    if (!habits) return; // handles habits=null as initial value

    const habitsCopy = [...habits];

    // return list of habits
    const newDisplayHabits = habitsCopy.filter(
      (habit) =>
        habit.dayOfWeek.filter(
          (dayBool, index) => days[index + 1] === selectedDay && dayBool
        ).length !== 0
    );

    setDisplayHabits(newDisplayHabits);
  };

  // get habit documents
  const getHabits = async () => {
    const userHabits = await getDocs(userHabitCollectionRef);

    if (userHabits) {
      setHabits(userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      console.log("no habits");
    }
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
        {habits ? (
          habits.length !== 0 ? (
            <FlatList
              style={{ width: "100%" }}
              data={displayHabits}
              renderItem={({ item }) => (
                <HabitItem removeHabit={(id) => removeHabit(id)} item={item} />
              )}
            />
          ) : (
            <NoHabits />
          )
        ) : (
          <NoHabits />
        )}
      </View>
    </Layout>
  );
};

export default DailyHabits;
