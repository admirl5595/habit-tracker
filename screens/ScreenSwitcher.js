import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import LoadingScreen from "./LoadingScreen";
import AllHabits from "./AllHabits";
import DailyHabits from "./DailyHabits";
import AddHabit from "./AddHabit";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";

import { auth } from "../firebase-config";

// conditional rendering for authenticated vs unauthenticated users
const ScreenSwitcher = () => {
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

  console.log(user.uid);

  return (
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
  );
};

export default ScreenSwitcher;
