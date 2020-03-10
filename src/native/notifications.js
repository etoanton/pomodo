/* eslint-disable import/prefer-default-export */
import { Notifications } from 'expo';

export const scheduleMultipleNotifications = (config = []) => {
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
