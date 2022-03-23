import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export const notificationSetup = (notificationListener, responseListener) => {
  registerForPushNotificationsAsync();

  Notifications.getAllScheduledNotificationsAsync().then((notifications) => {
    console.log("scheduled notifications:");
    console.log(notifications);
  });

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
export async function scheduleHabitReminders(dayOfWeekStrings, time, name) {
  // create a weekly notification for each day in dayOfWeekStrings at hour and minute mark from time

  // list of notification ids related to this habit
  let notificationIds = [];

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
      channelId: "Habit reminders", // identifier for habit reminder channel
      repeats: true,
      weekday: dayNums[dayString],
      hour: time.getHours(),
      minute: time.getMinutes(),
    };

    // id for notification
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to " + name.toLowerCase() + " today!",
        body: "Don't forget to " + name.toLowerCase() + " today!",
        data: { data: "goes here" },
      },
      trigger: trigger,
    });

    notificationIds.push(id);
  }

  return notificationIds;
}

// cancels reminders for a habit (at least one id)
export async function cancelHabitReminders(ids) {
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];

    Notifications.cancelScheduledNotificationAsync(id);
  }
}

// cancel old reminders and create new ones with new time
export async function editHabitReminders(ids, time) {
  let oldNotifications;

  await Notifications.getAllScheduledNotificationsAsync().then(
    (notifications) => {
      // get notifications matching by id
      oldNotifications = notifications.filter((notification) =>
        ids.includes(notification.identifier)
      );
    }
  );

  console.log(oldNotifications);

  // cancel the old habits
  await cancelHabitReminders(ids);

  for (let i = 0; i < oldNotifications.length; i++) {
    let oldNotification = oldNotifications[i];

    const trigger = {
      channelId: "Habit reminders", // identifier for habit reminder channel
      repeats: true,
      weekday: oldNotification.trigger.weekday,
      hour: time.getHours(),
      minute: time.getMinutes(),
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: oldNotification.content.title,
        body: oldNotification.content.body,
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
    // create channel with "Habit reminders" as identifier with object defining behaviour
    Notifications.setNotificationChannelAsync("Habit reminders", {
      name: "Habit reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
