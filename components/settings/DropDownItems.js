import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function DropDownItems(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      {/* <Image source={require("../../config/images/up-arrow.png")} /> */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => isOpen ? setOpen(false) : setOpen(true)}
      >
        <Text>{props.listName}</Text>
        <Image
          source={
            isOpen
              ? require("../../config/images/up-arrow.png")
              : require("../../config/images/down-arrow.png")
          }
        />
      </TouchableOpacity>
      {isOpen ? 
    props.list.map((item) => {
        <View >
            <Text>{item}</Text>
            <TouchableOpacity onPress={"Do something"}>Icon</TouchableOpacity>
        </View>
    }) :
    null
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoutBtn: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "blue",
    borderColor: "grey",
  },
});