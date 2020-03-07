import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { Button } from '../components';

const SampleScreen = ({ navigation }) => {
  console.log('navigation', navigation);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
        <Button>SampleScreen</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
  },
  screenContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

SampleScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SampleScreen;
