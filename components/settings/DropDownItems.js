import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import HabitsContext from "../../config/HabitsContext";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function DropDownItems(props) {
  const { habits } = useContext(HabitsContext);

  const [isOpen, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => (isOpen ? setOpen(false) : setOpen(true))}
      >
        <Text style={styles.btnTitle}>{props.listName}</Text>
        <Image
          source={
            isOpen
              ? require("../../config/images/up-arrow.png")
              : require("../../config/images/down-arrow.png")
          }
        />
      </TouchableOpacity>
      {isOpen
        ? habits.map((habit) => (
            <DisplayItems
              key={habit.id}
              habit={habit}
              navigation={props.navigation}
            />
          ))
        : null}
    </View>
  );
}

function DisplayItems({ habit, navigation }) {
  return (
    <View style={styles.dropDownListItem}>
      <View style={styles.habitItem}>
        <FontAwesomeIcon
          size={30}
          icon={habit.icon}
          style={{ color: habit.color }}
        />
        <Text style={styles.habitName}>{habit.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditHabit", { habit: habit })}
        style={styles.editBtn}
      >
        <Text style={styles.trippleDot}>...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  dropdownBtn: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    borderColor: "grey",
    backgroundColor: "#fff",
    elevation: 10,
  },
  dropDownListItem: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 15,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitName: {
    marginLeft: 15,
    fontSize: 20,
  },
  editBtn: {
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  trippleDot: {
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
    fontSize: 20,
    transform: [{ translateY: -5 }],
  },
  btnTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
});
