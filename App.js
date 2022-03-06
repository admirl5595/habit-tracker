import React from "react";
import { StyleSheet } from "react-native";

// screen management
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faT, faF, faCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faT, faF, faCircle);

// screens
import Habits from "./screens/Habits";
import CreateHabit from "./screens/CreateHabit";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Habits"
          component={Habits}
          options={{ title: "Habits screen" }}
        />
        <Stack.Screen
          name="CreateHabit"
          component={CreateHabit}
          options={{ title: "Create habit screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
