import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList } from "react-native";

import styles from "./DailyHabitsStyle";

import { db } from "../firebase-config";
import { collection, getDoc, doc, getDocs, addDoc } from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/HabitItem";

import Layout from "./Layout";

const DailyHabits = ({ navigation }) => {
  // current user
  const user = auth.currentUser;

  // each user has a user document has an id (uid)
  // each user also has a habits collection related to them (users/userId/habits)

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  const [habitsData, setHabitsData] = useState([]);

  const addHabit = async () => {
    const dummyHabit = {
      name: "dummy habit",
      completedDays: [true, true, false, false],
    };
    // adds document to user's habit collection (autoId)
    await addDoc(userHabitCollectionRef, dummyHabit);
  };

  // get habits from firestore
  useEffect(() => {
    const getHabits = async () => {
      // get habit documents
      const userHabits = await getDocs(userHabitCollectionRef);

      console.log(userHabits.docs.map((doc) => ({ id: doc.id })));

      setHabitsData(
        userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getHabits();
  }, []);

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.header}>Your habits</Text>
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
        <StatusBar style="auto" />
        <FlatList
          style={{ width: "100%" }}
          data={habitsData}
          renderItem={({ item }) => <HabitItem item={item} />}
        />
      </View>
      <Button title="make dummy habit" onPress={addHabit} />
    </Layout>
  );
};

export default DailyHabits;
