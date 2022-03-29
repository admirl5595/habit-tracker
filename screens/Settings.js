import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import HabitsContext from "../config/HabitsContext";
import DropDownItems from "../components/settings/DropDownItems";
import LogoutBtn from "../components/auth/LogoutBtn";
import { auth } from "./../firebase-config";

export default function Settings({ navigation }) {
  const { habits } = useContext(HabitsContext);

  // Show a settings interface for user
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userCard}>
          <Text style={styles.text}>
            Signed in as: {auth.currentUser.email}
          </Text>
        </View>
        <View>
          <DropDownItems
            listName="My Habits"
            list={habits}
            navigation={navigation}
          />
        </View>
        <View style={styles.centeredView}>
          <LogoutBtn />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  userCard: {
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    elevation: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
