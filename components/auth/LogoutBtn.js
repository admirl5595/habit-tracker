import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react'
import { primaryColor } from "../../config/theme/styles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";


export default function LogoutBtn() {
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

const styles = StyleSheet.create({
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
