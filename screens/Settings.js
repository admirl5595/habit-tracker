import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import HabitsContext from "../config/HabitsContext";
import DropDownItems from "../components/settings/DropDownItems";
import LogoutBtn from "../components/auth/LogoutBtn";
import { auth } from "./../firebase-config";

export default function Settings({navigation}) {

  const { habits } = useContext(HabitsContext);

  // Show a settings interface for user
  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: "stretch" }}>
      <Text style={{textAlign: 'left', fontSize: 18}}> Signed in as:  {auth.currentUser.email}</Text>
        <LogoutBtn/> 
        <View>
          <DropDownItems
            listName="My Habits"
            list={habits}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  }
});


