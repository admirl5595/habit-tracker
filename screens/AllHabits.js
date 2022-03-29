import React, { useEffect, useState } from "react";

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Layout from "./Layout";

import WeekTable from "../components/weekly-habits/WeekTable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AllHabits = ({ navigation }) => {
  const [datesInChosenWeek, setDatesInChosenWeek] = useState([]);
  const [week, setWeek] = useState(new Date());
  const [sunday, setSunday] = useState();
  const [saturday, setSaturday] = useState();

  useEffect(() => {
    findDatesInChosenWeek();
  }, []);

  // Rename
  const findDatesInChosenWeek = (result) => {
    console.log("find dates: " + result);

    let d = result ? result : new Date();

    let daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(d.setDate(d.getDate() - d.getDay() + i));
      let stringifyDate =
        day.getDate().toString() + " " + day.getMonth().toString();

      daysOfWeek.push(stringifyDate);
    }
    setSunday(daysOfWeek[0]);
    setSunday(daysOfWeek[6]);
    setDatesInChosenWeek(daysOfWeek);
    console.log("Days of week: " + daysOfWeek);
  };

  const lastWeek = () => {
    let result = new Date(week);
    console.log("result: " + result);

    result = new Date(result.setDate(result.getDate() - 7));

    setWeek(new Date(result));
    findDatesInChosenWeek(new Date(result));
  };

  const nextWeek = () => {
    let result = new Date(week);
    result = new Date(result.setDate(result.getDate() + 7));
    setWeek(new Date(result));
    findDatesInChosenWeek(new Date(result));
    console.log(result);
  };

  return (
    <Layout navigation={navigation}>
      {console.log("In return: " + datesInChosenWeek)}
      <View style={styles.container}>
        <View style={styles.weekSwitcher}>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={lastWeek} style={styles.arrow}>
              <FontAwesomeIcon size={30} icon="caret-left" />
            </TouchableOpacity>
            <Text style={styles.arrow}>Week</Text>
            <TouchableOpacity style={styles.arrow} onPress={nextWeek}>
              <FontAwesomeIcon size={30} icon="caret-right" />
            </TouchableOpacity>
          </View>
        </View>
        {datesInChosenWeek.length ? (
          <WeekTable datesInChosenWeek={datesInChosenWeek} />
        ) : null}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  weekSwitcher: {
    alignItems: "center",
    alignContent: "center",
  },
  iconRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
});

export default AllHabits;
