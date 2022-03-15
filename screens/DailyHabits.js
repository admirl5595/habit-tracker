import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList } from "react-native";

import styles from "./DailyHabitsStyle";

import db from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import HabitItem from "../components/HabitItem";

const DailyHabits = () => {
  // bytt "dailyspending" til "habits"
  const habitsCollectionRef = collection(db, "habits");

  const [habitsData, setHabitsData] = useState([]);

  // hent data fra firebase
  useEffect(() => {
    const getHabits = async () => {
      const data = await getDocs(habitsCollectionRef);
      setHabitsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getHabits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your habits</Text>
      <StatusBar style="auto" />
      <FlatList
        style={{ width: "100%" }}
        data={habitsData}
        renderItem={({ item }) => <HabitItem item={item} />}
      />
    </View>
  );
};

export default DailyHabits;
