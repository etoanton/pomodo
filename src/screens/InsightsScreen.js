import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Insights, useDataFetching } from '../api';


const InsightsScreen = ({ navigation }) => {
  const { results: countResults } = useDataFetching(Insights.getCount);
  const { results: durationResults } = useDataFetching(Insights.getDuration);

  console.log('InsightsScreen (count)', countResults);
  console.log('InsightsScreen (durations)', durationResults);

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
        <Text>Insights</Text>
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

InsightsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default InsightsScreen;
