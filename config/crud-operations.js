import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { cancelHabitReminders } from "./notifications-config";

import { db, auth } from "../firebase-config";

// get habit documents
export const getHabits = async (setHabits) => {
  const user = auth.currentUser;

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  const userHabits = await getDocs(userHabitCollectionRef).catch((e) => {
    Alert.alert("Couldn't get habits", e.message);
    return;
  });

  if (userHabits)
    setHabits(userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export const createHabit = async (newHabitInfo) => {
  const user = auth.currentUser;

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  // add key value pairs to the new habit and declare completed days array (list of dates)
  const newHabit = { ...newHabitInfo, completedDays: [] };

  // adds document to user's habit collection (autoId)
  const res = await addDoc(userHabitCollectionRef, newHabit);

  return res;
};

export const updateHabit = async (updatedHabitInfo, habit) => {
  const user = auth.currentUser;

  // update name, dayOfWeek, color and time for this habit (keep completed)
  const updatedHabitFields = { ...updatedHabitInfo };

  const habitDoc = doc(db, "users", user.uid, "habits", habit.id);

  let res = true;

  // adds document to user's habit collection (autoId)
  await updateDoc(habitDoc, updatedHabitFields).catch((e) => {
    Alert.alert("Couldn't edit habit", e.message);
    res = false;
  });

  return new Promise((resolve, reject) => {
    res
      ? setTimeout(function () {
          resolve(true);
        }, 250)
      : reject(false);
  });
};

// remove habit by id and cancel notifications
export const removeHabit = async (habitId) => {
  const user = auth.currentUser;

  const habitDoc = doc(db, "users", user.uid, "habits", habitId);

  await deleteDoc(habitDoc).catch((e) => {
    Alert.alert("Couldn't delete habit", e.message);
    return;
  });

  let notificationIds;

  try {
    notificationIds = await AsyncStorage.getItem(habitId);

    notificationIds = notificationIds ? JSON.parse(notificationIds) : null;

    cancelHabitReminders(notificationIds);
  } catch (e) {
    console.log("error occured when fetching local data");
    console.log(e);
  }
};

// complete a habit (only for todays date)
export const completeHabit = async (id) => {
  const user = auth.currentUser;

  const habitRef = doc(db, "users", user.uid, "habits", id);

  let habitDoc = await getDoc(habitRef).catch((e) => {
    Alert.alert("Couldn't complete habit", e.message);
    return;
  });

  let habit = habitDoc.data();

  if (!habit) {
    Alert.alert("Couldn't get habit");
    return;
  }

  // get old completed days array
  let oldCompletedDays = habit.completedDays;

  // append todays date
  let newCompletedDays = [...oldCompletedDays, new Date()];

  await updateDoc(habitRef, { completedDays: newCompletedDays }).then(() =>
    console.log("updated")
  );
};
