import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import { Button, Text, TouchableOpacity } from "react-native";

import LoadingScreen from "./LoadingScreen";
import AllHabits from "./AllHabits";
import DailyHabits from "./DailyHabits";
import AddHabit from "./AddHabit";
import EditHabit from "./EditHabit";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import Settings from "./Settings";

import { auth } from "../firebase-config";

// conditional rendering for authenticated vs unauthenticated users
const ScreenSwitcher = () => {
  const Stack = createNativeStackNavigator();

  const options = ({ navigation }) => ({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text>Settings</Text>
      </TouchableOpacity>
    ),
  });

  const AppScreens = (
    <>
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Text>Settings</Text>
            </TouchableOpacity>
          ),
        })}
        name="DailyHabits"
        component={DailyHabits}
      />
      <Stack.Screen options={options} name="AllHabits" component={AllHabits} />
      <Stack.Screen options={options} name="AddHabit" component={AddHabit} />
      <Stack.Screen options={options} name="EditHabit" component={EditHabit} />
      <Stack.Screen options={options} name="Settings" component={Settings} />
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
