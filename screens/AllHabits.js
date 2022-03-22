import React, { useContext } from "react";

import { View, StyleSheet } from "react-native";
import Layout from "./Layout";

import HabitsContext from "../config/HabitsContext";
import Week from "../components/weekly-habits/Week";
import WeekTable from "../components/weekly-habits/WeekTable";

const AllHabits = ({ navigation }) => {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
      <Week/>
      <WeekTable/>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});

export default AllHabits;
