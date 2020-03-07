import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import TimerContext from '../state/TimerContext';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { Button } from '../components';

const TimerProgressScreen = ({ navigation }) => {
  const { timerState: { list } } = useContext(TimerContext);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
        <View style={styles.contentContainer}>
          {list.map(({ label }) => <Text>{label}</Text>)}
        </View>
        {/* <Button>TimerProgressScreen</Button> */}
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button label="Cancel" onPress={() => navigation.navigate('TimerSetup')} btnStyles={styles.cancelBtn} />
          </View>
        </View>
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
  actionListContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#2F2F38',
  },
});

TimerProgressScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TimerProgressScreen;
