import { MAIN_BACKGROUND_COLOR } from './src/styles/colors';

const APP_NAME = 'PomoDo';
const ICON_PATH = './src/assets/icon.png';
const SPLASH_PATH = './src/assets/icon.png';

export default {
  name: APP_NAME,
  slug: 'pomodo',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  primaryColor: MAIN_BACKGROUND_COLOR,
  owner: 'Anton Stsiashko (dsteshko@gmail.com)',
  privacy: 'unlisted',
  sdkVersion: '36.0.0',
  platforms: [
    'ios',
    'android',
  ],
  version: '1.0.0',
  orientation: 'portrait',
  icon: ICON_PATH,
  splash: {
    image: SPLASH_PATH,
    resizeMode: 'contain',
    backgroundColor: MAIN_BACKGROUND_COLOR,
  },
  entryPoint: './App.js',
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
  ],
  ios: {
    bundleIdentifier: 'pro.pomodo.app.ios',
    buildNumber: '1.0.0',
    backgroundColor: MAIN_BACKGROUND_COLOR,
    // icon: IOS_ICON_PATH,
    // splash; IOS_SPLASH_PATH
    supportsTablet: false,
  },
  android: {
    package: 'pro.pomodo.app.ios',
    versionCode: 1,
    permissions: ['VIBRATE', 'WAKE_LOCK'],
  },
  description: '',
};
