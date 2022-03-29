import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import HabitsContext from "../../config/HabitsContext";


export default function DropDownItems(props) {
  const { habits } = useContext(HabitsContext);

  const [isOpen, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => (isOpen ? setOpen(false) : setOpen(true))}
      >
        <Text >{props.listName}</Text>
        <Image
          source={
            isOpen
              ? require("../../config/images/up-arrow.png")
              : require("../../config/images/down-arrow.png")
          }
        />
      </TouchableOpacity>
      {isOpen ? habits.map((habit) => <DisplayItems habit={habit} navigation={props.navigation} />) : null}
    </View>
  );
}

function DisplayItems({habit, navigation}) {
  return (
    <View style={styles.dropDownListItem}>
      <View style={styles.habitItem}>
        <FontAwesomeIcon
          size={20}
          icon={habit.icon}
          style={{ color: habit.color }}
        />
        <Text style={styles.habitName}>{habit.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditHabit", { habit: habit })}
        style={styles.editBtn}
      >
        <Text
          style={styles.trippleDot}
        >
          ...
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 10,
  },
  logoutBtn: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  dropDownListItem: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 15,
  },
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitName: {
    marginLeft: 15,
  },
  editBtn: {
      backgroundColor: "rgba(0,0,0,0.15)",
      borderRadius: 100,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      width: 25
  },
  trippleDot: {
            fontWeight: "bold",
            color: "rgba(0,0,0,0.5)",
            fontSize: 18,
            transform: [{ translateY: -5 }],
          }
});
