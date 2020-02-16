import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PomodoItem } from '../components';
import { Pomodos, useDataFetching } from '../api';

const DayOverviewScreen = ({ navigation }) => {
  const { selectedDay } = navigation.state.params;

  const { loading, results } = useDataFetching(Pomodos.getPomodo, selectedDay);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons
            name="md-close"
            size={32}
            color="#F1F1F1"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        { loading && <ActivityIndicator size="small" color="#F1F1F1" /> }
        { !loading && results.data && results.data.map(item => (
          <PomodoItem key={item.id} item={item} />
        )) }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#32323d', // MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});

DayOverviewScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DayOverviewScreen;
