import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Insights, useDataFetching } from '../api';
import { InsightItem } from '../components';

const round = v => Math.round(v * 100) / 100;

const InsightsScreen = ({ navigation }) => {
  const { results: countResults } = useDataFetching(Insights.getCount);
  const { results: durationResults } = useDataFetching(Insights.getDuration);

  const { data: { average: countAverage = 0, list: countList } } = countResults;
  const { data: { average: durationAverage = 0, list: durationList } } = durationResults;

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
        <View style={styles.itemContainer}>
          <InsightItem
            title="Count"
            list={countList}
            footerLabel="Average"
            footerValue={`${round(countAverage)} times / day`}
          />
        </View>
        <View style={styles.itemContainer}>
          <InsightItem
            title="Duration"
            list={durationList}
            footerLabel="Average"
            footerValue={`${round(durationAverage)} min / day`}
          />
        </View>
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
    paddingTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 15,
  },
});

InsightsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default InsightsScreen;
