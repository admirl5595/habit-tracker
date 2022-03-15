import { View, Text } from 'react-native'
import React from 'react'

import DailyHabits from '../screens/DailyHabits';
import AllHabits from '../screens/AllHabits';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
<>
      <Stack.Navigator>
        <Stack.Screen
          name="Daily Habits"
          component={DailyHabits}
          options={{ title: "Daily Habits screen" }}
        />
        <Stack.Screen
          name="AllHabits"
          component={AllHabits}
          options={{ title: "All habits screen" }}
        />

      </Stack.Navigator>
      </>
  )
}