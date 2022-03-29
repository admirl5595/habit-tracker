import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import HabitsContext from "../config/HabitsContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { primaryColor } from "../config/theme/styles";
import DropDownItems from "../components/settings/DropDownItems";

export default function Settings() {
  const { habits } = useContext(HabitsContext);
  // const habitNames = [...habits.name];

  const displayHabit = (habit) => {
    return (
      <View>
        <Text>{habit.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: "stretch" }}>
        <View>
          <TouchableOpacity
            onPress={() =>
              signOut(auth)
                .then(() => {
                  // Sign-out successful
                  setHabits(null); // clear context
                })
                .catch((error) => {
                  // An error happened
                  console.log(error);
                })
            }
            style={styles.logoutBtn}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>




        <View style={{ height: 96 }}>
          <DropDownItems listName="My Habits" list={["habitNames", "g"]}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  dropDownItem: { flex: 1 },
  logoutBtn: {
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: primaryColor,
    borderColor: "grey",
  },
});

function undefined({ error }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          signOut(auth)
            .then(() => {
              // Sign-out successful
              setHabits(null); // clear context
            })
            .catch((error) => {
              // An error happened
              console.log(error);
            })
        }
        style={styles.logoutBtn}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
