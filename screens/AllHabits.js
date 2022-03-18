import React, { useContext } from "react";

import { Text } from "react-native";
import Layout from "./Layout";

import HabitsContext from "../config/HabitsContext";

const AllHabits = ({ navigation }) => {
  // use context
  const { habits, setHabits } = useContext(HabitsContext);

  return (
    <Layout navigation={navigation}>
      <Text>All habits</Text>
      {habits.map((habit) => (
        <Text key={habit.id}>{habit.name}</Text>
      ))}
    </Layout>
  );
};

export default AllHabits;
