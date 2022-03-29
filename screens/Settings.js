import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import HabitsContext from "../config/HabitsContext";

import DropDownItems from "../components/settings/DropDownItems";
import LogoutBtn from "../components/auth/LogoutBtn";

export default function Settings({navigation}) {

  const { habits } = useContext(HabitsContext);

  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: "stretch" }}>
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


