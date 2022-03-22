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

  const displayCell = (props, numCDays, rowIndex) => {
    const cdString = props.cDays.map(
      (day) =>
        day.toDate().getDate().toString() +
        " " +
        day.toDate().getMonth().toString()
    );
    const d =
      props.day.getDate().toString() + " " + props.day.getMonth().toString();

    if (cdString.includes(d)) {
      numCDays[0] += 1;
      return (
        <Cell
          style={styles.habitCheckboxCell}
          key={rowIndex + props.day.getDate()}
          data={<View style={styles.habitCheckbox}></View>}
          textStyle={styles.text}
          borderStyle={{ borderWidth: 1, borderColor: "#000" }}
        />
      );
    } else
      return (
        <Cell
          style={styles.habitCheckboxCell}
          key={rowIndex + props.day.getDate()}
          data={<View style={styles.habitCheckbox} opacity={0.3}></View>}
          textStyle={styles.text}
          borderStyle={{ borderWidth: 1, borderColor: "#000" }}
        />
      );
  };

  const displayRow = (props, rowIndex) => {
    const cDays = props.completedDays;
    let numCDays = [0];

    return (
      <>
        <TableWrapper style={styles.row}>
          <Cell
            key={"icon "+rowIndex}
            data={
              <>
                <FontAwesomeIcon size={30} icon={props.icon} />
              </>
            }
            borderStyle={{ borderWidth: 1, borderColor: "#000" }}
          ></Cell>
          {daysInWeek.map((day, cellIndex) =>
            displayCell({ cDays, day }, numCDays, rowIndex)
          )}
          <Cell
            key={"percentage "+rowIndex}
            data={Math.ceil((numCDays / 7) * 100)}
            textStyle={styles.text}
            borderStyle={{ borderWidth: 1, borderColor: "#000" }}
          ></Cell>
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
  row: {
    height: 40,
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    borderWidth: 0,
  },
  habitCheckbox: {
    backgroundColor: "#68a0cf",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    width: 25,
    height: 25,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
