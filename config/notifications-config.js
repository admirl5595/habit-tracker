import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export const notificationSetup = (notificationListener, responseListener) => {
  registerForPushNotificationsAsync();

  notificationListener.current =
    Notifications.addNotificationReceivedListener();

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener();

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
};

// schedule a notification at a time in daysOfWeek
// dayOfWeekStrings: list of day strings
// time: Date object (only hours and minutes are relevant)
// name: habit name (string)
export async function schedulePushNotification(dayOfWeekStrings, time, name) {
  // create a weekly notification for each day in dayOfWeekStrings at hour and minute mark from time

  console.log(dayOfWeekStrings);
  console.log(time.getHours() + time.getMinutes().toString());
  console.log(name);

  const dayNums = {
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
    sunday: 1,
  };
  for (let i = 0; i < dayOfWeekStrings.length; i++) {
    let dayString = dayOfWeekStrings[i];

    const trigger = {
      repeats: true,
      weekday: dayNums[dayString],
      hour: time.getHours(),
      minute: time.getMinutes(),
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to " + name + " today!",
        body: "Don't forget to " + name + " today!",
        data: { data: "goes here" },
      },
      trigger: trigger,
    });
  }
}

// get notification access token
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
