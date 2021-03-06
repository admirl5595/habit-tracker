import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Table, TableWrapper, Cell } from "react-native-table-component";
import HabitsContext from "../../config/HabitsContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function WeekTable({ datesInChosenWeek }) {
  const { habits } = useContext(HabitsContext);
  const [daysInWeek, setDaysInWeek] = useState([]);

  useEffect(() => {
    setDaysInWeek(datesInChosenWeek);
  }, [datesInChosenWeek]);

  const tableHead = ["", "S", "M", "T", "W", "T", "F", "S", "%"];

  const isDayCompleted = (cDays, day, numCDays) => {
    // Refactor
    const cdString = cDays.map(
      (day) =>
        day.toDate().getDate().toString() +
        " " +
        day.toDate().getMonth().toString()
    );

    if (cdString.includes(day)) {
      numCDays[0] += 1;
      return true;
    } else return false;
  };

  // Edit props and parameters
  const displayHead = (item, index) => {
    return (
      <Cell
        key={index}
        data={
          <View style={index !== 0 ? styles.tableHead : null}>
            <Text style={styles.text}>{item}</Text>
          </View>
        }
        borderStyle={{ borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}
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
        <TableWrapper key={rowIndex} style={styles.row}>
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
            borderStyle={{ borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}
          />

          {daysInWeek.map((day) =>
            displayCell({ cDays, day }, numCDays, props)
          )}

          <Cell
            key={"percentage " + rowIndex}
            data={Math.ceil((numCDays / 7) * 100)}
            textStyle={[styles.text, { fontSize: 14 }]}
            borderStyle={{ borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}
          />
        </TableWrapper>
      </>
    );
  };

  // Edit props and parameters
  const displayCell = (props, numCDays, habit) => {
    const backGroundColor = {
      backgroundColor: habit.color,
    };

    return (
      <Cell
        textStyle={styles.text}
        // Add custom color
        data={
          <View
            opacity={
              isDayCompleted(props.cDays, props.day, numCDays) ? 0.9 : 0.1
            }
            style={[styles.habitCheckbox, backGroundColor]}
          ></View>
        }
        borderStyle={{ borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {console.log("From WeekTable: " + daysInWeek)}
      <Table borderStyle={{ borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}>
        {/* Top row */}
        <TableWrapper style={[styles.row, { height: 50 }]}>
          {tableHead.map((item, index) => displayHead(item, index))}
        </TableWrapper>
        {/* Display habits in table */}
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
  tableHead: {
    backgroundColor: "rgba(255, 178, 166, 0.6)",
    borderRadius: 100,
    height: 35,
    justifyContent: "center",
  },
  title: { backgroundColor: "#f6f8fa" },
  icon: { marginLeft: "auto", marginRight: "auto" },
  row: {
    height: 45,
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
