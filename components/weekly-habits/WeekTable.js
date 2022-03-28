import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import HabitsContext from "../../config/HabitsContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function WeekTable() {
  const { habits } = useContext(HabitsContext);
  const [daysInWeek, setDaysInWeek] = useState([]);
  useEffect(() => {
    findDaysInWeek();
  }, []);

  const tableHead = ["", "S", "M", "T", "W", "T", "F", "S", "%"];

  // Rename
  const findDaysInWeek = () => {
    const today = new Date();
    let daysOfWeek = [];
    const sunday = new Date(today.setDate(today.getDate() - today.getDay()));
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        new Date(today.setDate(today.getDate() - today.getDay() + i))
      );
    }
    setDaysInWeek(daysOfWeek);
  };

  const isDayCompleted = (cDays, day, numCDays) => {
    // Refactor
    const cdString = cDays.map(
      (day) =>
        day.toDate().getDate().toString() +
        " " +
        day.toDate().getMonth().toString()
    );
    const d = day.getDate().toString() + " " + day.getMonth().toString();

    if (cdString.includes(d)) {
      numCDays[0] += 1;
      return true;
    } else return false;
  };

  // Edit props and parameters
  const displayCell = (props, numCDays, rowIndex, habit) => {
    const backGroundColor = {
      backgroundColor: habit.color,
    };

    return (
      <Cell
        textStyle={styles.text}
        key={rowIndex + props.day.getDate()}
        // Add custom color
        data={
          <View
            opacity={
              isDayCompleted(props.cDays, props.day, numCDays) ? 0.9 : 0.1
            }
            style={[styles.habitCheckbox, backGroundColor]}
          ></View>
        }
        borderStyle={{ borderWidth: 1, borderColor: "#000" }}
      />
    );
  };

  // Change props name
  const displayRow = (props, rowIndex) => {
    const cDays = props.completedDays;
    // Is array to be passed by reference
    let numCDays = [0];

    const IconColor = {
      color: props.color,
    };

    return (
      <>
        <TableWrapper style={styles.row}>
          <Cell
            textStyle={styles.text}
            key={"icon " + rowIndex}
            data={
              <>
                <FontAwesomeIcon
                  size={30}
                  icon={props.icon}
                  style={[styles.icon, IconColor]}
                />
              </>
            }
            borderStyle={{ borderWidth: 1, borderColor: "#000" }}
          />
          {daysInWeek.map((day, cellIndex) =>
            displayCell({ cDays, day }, numCDays, rowIndex, props)
          )}
          <Cell
            key={"percentage " + rowIndex}
            data={Math.ceil((numCDays / 7) * 100)}
            textStyle={styles.text}
            borderStyle={{ borderWidth: 1, borderColor: "#000" }}
          />
        </TableWrapper>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {habits.map((habit, rowIndex) => displayRow(habit, rowIndex))}
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { backgroundColor: "#f6f8fa" },
  icon: { marginLeft: "auto", marginRight: "auto" },
  row: {
    height: 40,
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    borderWidth: 0,
    fontSize: 20,
  },
  habitCheckbox: {
    backgroundColor: "#68a0cf",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    width: 25,
    height: 25,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "grey",
  },
});
