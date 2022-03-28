import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { backgroundColor: "#f6f8fa" },
  icon: { marginLeft: "auto", marginRight: "auto" },
  row: {
    height: 40,
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    borderWidth: 0,
    fontSize: 20,
  },
  habitCheckbox: {
    backgroundColor: "#68a0cf",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    width: 25,
    height: 25,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "grey",
  },
});

export default styles;
