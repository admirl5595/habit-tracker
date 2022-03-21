import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // main container
  container: {
    flex: 1,
    marginHorizontal: 15,
  },

  iconsContainer: {
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    flex: 1,
  },

  inputLabel: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },

  textInput: {
    fontSize: 18,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 5,
  },

  icon: {
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },

  colorSelectorContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    height: 170,
  },

  // style for color selector
  colorSelector: {
    height: "30%",
    width: "30%",
    elevation: 5,
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  errorMessage: {
    color: "rgba(241,81,71,1)",
    fontSize: 15,
    textAlign: "center",
  },
});

export default styles;
