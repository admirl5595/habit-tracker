import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList } from "react-native";

import styles from "./DailyHabitsStyle";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import HabitItem from "../components/HabitItem";

import Layout from "./Layout";

const DailyHabits = ({navigation}) => {
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
    </Layout>
    
  );
};

export default DailyHabits;
