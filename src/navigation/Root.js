import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeMenuModal from '../screens/HomeMenuModal';

const HomeScreenStack = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn: SignInScreen,
    HomeMenu: HomeMenuModal,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    // transparentCard: true
  }
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