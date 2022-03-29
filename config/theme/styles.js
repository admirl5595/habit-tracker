import { Text, StyleSheet, View } from "react-native";

// primary color for the application
export const primaryColor = "rgb(154, 220, 255)";

export const secondaryColor = "rgba(71,188,241,1)";

export const theme = StyleSheet.create({
  // use on TouchableOpacity
  btnContainer: {
    padding: 10,

    borderRadius: 15,
    borderColor: primaryColor,
    margin: 15,
    backgroundColor: secondaryColor,
  },
  // use on Text inside TouchableOpacity
  btnText: {
    textAlign: "center",

    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
