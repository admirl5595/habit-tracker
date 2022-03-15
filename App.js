import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import AllHabits from "./screens/AllHabits";
import DailyHabits from "./screens/DailyHabits";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faT, faF, faCircle } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native-web";
library.add(faT, faF, faCircle);

const AppStack = createStackNavigator({
  DailyHabits: DailyHabits,
  AllHabits: AllHabits,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
