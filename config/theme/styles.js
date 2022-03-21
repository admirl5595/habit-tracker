import { Text, StyleSheet, View } from "react-native";

// primary color for the application
export const primaryColor = "rgba(138,241,219,1)";

export const theme = StyleSheet.create({
  // use on TouchableOpacity
  btnContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  // use on Text inside TouchableOpacity
  btnText: {
    textAlign: "center",
  },
});
