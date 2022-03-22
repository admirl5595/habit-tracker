import React, { useState, useEffect, useRef } from "react";

import { LogBox, Platform } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import {
  notificationSetup,
  schedulePushNotification,
} from "./config/notifications-config";

import ScreenSwitcher from "./screens/ScreenSwitcher";

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
  faCaretUp,
  faCaretDown,
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
  faCaretUp,
  faCaretDown
);

import HabitsContext from "./config/HabitsContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // notificationSetup(notificationListener, responseListener);
  }, []);

  const [habits, setHabits] = useState([]);

  // conditional rendering of screens
  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      <ScreenSwitcher />
    </HabitsContext.Provider>
  );
};

export default App;
