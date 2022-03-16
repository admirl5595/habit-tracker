import { StyleSheet } from "react-native";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  InputView: {
    backgroundColor: "rgba(138,241,219,1)",
    borderRadius: 30,
    width: "70%",
    marginBottom: 20,
  },
  TextInput: {
    padding: 10,
    textAlign: "center",
    color: "#003f5c",
  },
  btn: {
    width: "40%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(138,241,180,1)",
  },
  btnText: {
    textAlign: "center",
  },
  img: {
    width: 250,
    height: 250,
    margin: 20,
    borderRadius: 50,
  },
});

export default styles;
