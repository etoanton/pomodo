/* eslint-disable import/prefer-default-export */
import * as Permissions from 'expo-permissions';

async function getNotificationPermission() {
  const { status, canAskAgain, granted } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );

  console.log('status', status);
  console.log('canAskAgain', canAskAgain);
  console.log('granted', granted);

  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export { getNotificationPermission };
