const MAIN_BACKGROUND_COLOR = '#373845';

const APP_NAME = 'PomoDo';
const ICON_PATH = './src/assets/icon.png';
const SPLASH_PATH = './src/assets/splash.png';

export default {
  name: APP_NAME,
  slug: 'pomodo',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  primaryColor: MAIN_BACKGROUND_COLOR,
  owner: 'etoanton',
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
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
  ],
  ios: {
    bundleIdentifier: 'pro.antonsteshko.pomodo',
    buildNumber: '1.0.0',
    backgroundColor: MAIN_BACKGROUND_COLOR,
    // icon: IOS_ICON_PATH,
    // splash; IOS_SPLASH_PATH
    supportsTablet: false,
  },
  android: {
    package: 'pro.antonsteshko.pomodo',
    versionCode: 1,
    permissions: ['VIBRATE', 'WAKE_LOCK'],
  },
  description: '',
};
