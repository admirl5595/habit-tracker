import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';


import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function AuthNavigator() {
  return (
<>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Daily Habits screen" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "All habits screen" }}
        />

      </Stack.Navigator>
      </>
  )
}