import React, { useState } from "react";

import { LogBox } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import { auth } from "./firebase-config";

import LoadingScreen from "./screens/LoadingScreen";
import AllHabits from "./screens/AllHabits";
import DailyHabits from "./screens/DailyHabits";
import AddHabit from "./screens/AddHabit";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";

import { useAuthState } from "react-firebase-hooks/auth";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

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
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretRight,
  faCaretLeft,
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
  faTrash,
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretRight,
  faCaretLeft
);

import HabitsContext from "./config/HabitsContext";

const App = () => {
  const Stack = createNativeStackNavigator();

  const AppScreens = (
    <>
      <Stack.Screen name="DailyHabits" component={DailyHabits} />
      <Stack.Screen name="AllHabits" component={AllHabits} />
      <Stack.Screen name="AddHabit" component={AddHabit} />
    </>
  );
  const AuthScreens = (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </>
  );

  // listen to user authentication state
  const [user, loading, error] = useAuthState(auth);

  const [habits, setHabits] = useState([]);

  console.log("context changed");

  // conditional rendering of screens
  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            AppScreens
          ) : loading ? (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : (
            AuthScreens
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </HabitsContext.Provider>
  );
};

export default App;
