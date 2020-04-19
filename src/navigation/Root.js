// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import NavigationMenu from './screens/NavigationMenu';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import DayOverviewScreen from './screens/DayOverviewScreen';
import TimerSetupScreen from './screens/TimerSetupScreen';
import TimerProgressScreen from './screens/TimerProgressScreen';
import SessionCompleteScreen from './screens/SessionCompleteScreen';

const HomeScreenStack = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: NavigationMenu,
    DayOverview: DayOverviewScreen,
    Profile: ProfileScreen,
    TimerSetup: TimerSetupScreen,
    TimerProgress: TimerProgressScreen,
    SessionComplete: SessionCompleteScreen,

    SignIn: SignInScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    // transparentCard: true
  },
);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreenStack,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
