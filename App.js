import React from "react";

import { LogBox } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import AllHabits from "./screens/AllHabits";
import DailyHabits from "./screens/DailyHabits";
import AddHabit from "./screens/AddHabit";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash
);

const AppStack = createStackNavigator({
  DailyHabits: DailyHabits,
  AllHabits: AllHabits,
  AddHabit: AddHabit,
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
