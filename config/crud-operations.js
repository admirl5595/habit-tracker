import { useContext } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import HabitsContext from "./HabitsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { cancelHabitReminders } from "./notifications-config";

import { db, auth } from "../firebase-config";

// get habit documents
export const getHabits = async (setHabits) => {
  const user = auth.currentUser;

  // get user's habits collection (users/userId/habits)
  const userHabitCollectionRef = collection(db, "users", user.uid, "habits");

  const userHabits = await getDocs(userHabitCollectionRef);

  setHabits(userHabits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

// remove habit by id and cancel notifications
export const removeHabit = async (habitId) => {
  const user = auth.currentUser;

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
};

// complete a habit (only for todays date)
export const completeHabit = async (id) => {
  const user = auth.currentUser;

  console.log(id);
  console.log(user.uid);

  const habitRef = doc(db, "users", user.uid, "habits", id);

  let habitDoc = await getDoc(habitRef);

  let habit = habitDoc.data();

  // get old completed days array
  let oldCompletedDays = habit.completedDays;

  // append todays date
  let newCompletedDays = [...oldCompletedDays, new Date()];

  await updateDoc(habitRef, { completedDays: newCompletedDays });
};
