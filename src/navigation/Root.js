// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import HomeMenuModal from '../screens/HomeMenuModal';
import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeScreenStack = createStackNavigator(
  {
    Home: HomeScreen,
    HomeMenu: HomeMenuModal,
    SignIn: SignInScreen,
    Profile: ProfileScreen,
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
