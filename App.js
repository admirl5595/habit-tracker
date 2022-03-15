import React from "react";
// screen management
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./screens/LoadingScreen";


// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faT, faF, faCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faT, faF, faCircle);


import AppNavigator from "./config/AuthNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <LoadingScreen/>
    </NavigationContainer>
  );
}
