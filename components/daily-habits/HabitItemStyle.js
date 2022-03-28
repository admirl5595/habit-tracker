import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  habitContainer: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  habitHeader: {
    fontSize: 25,
    marginLeft: 20,
    flex: 1,
    color: "black",
    fontWeight: "normal",
  },
  removeBtn: {
    color: "rgba(255,50,50,1)",
    marginHorizontal: 5,
  },
  completeBtn: {
    color: "rgba(255,255,255, 1)",
    marginHorizontal: 5,
  },
});

export default styles;
