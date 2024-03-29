/* eslint-disable import/prefer-default-export */
import { Notifications } from 'expo';

export const scheduleTimerMultipleNotifications = async (config = []) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  // TODO: local notifications
  // Notifications.addListener(this._handleNotification);

  config.forEach(({ title, body, timeStamp }) => {
    const localnotification = {
      title,
      body,
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };

    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      { time: timeStamp },
    );
  });
};

export const cancelAllScheduledNotificationsAsync = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};
