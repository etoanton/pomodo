import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Insights, useDataFetching } from '../api';
import { InsightItem } from '../components';

const round = v => Math.round(v * 100) / 100;

const InsightsScreen = ({ navigation }) => {
  const now = new Date();
  const [selectedCountDate, setSelectedCountDate] = useState(now);
  const [selectedDurationDate, setSelectedDurationDate] = useState(now);

  const {
    results: countResults,
    loading: countLoading,
  } = useDataFetching(Insights.getCount);

  const {
    results: durationResults,
    loading: durationLoading,
  } = useDataFetching(Insights.getDuration);

  const { average: countAverage = 0, list: countList } = countResults.data || {};
  const { average: durationAverage = 0, list: durationList } = durationResults.data || {};

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
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <InsightItem
              title="Count"
              currentDate={selectedCountDate}
              setDate={setSelectedCountDate}
              loading={countLoading}
              list={countList}
              keyExtract="completedCount"
              extraInfo={{ label: 'Average', value: `${round(countAverage)} times / day` }}
            />
          </View>
          <View style={styles.itemContainer}>
            <InsightItem
              title="Duration"
              currentDate={selectedDurationDate}
              setDate={setSelectedDurationDate}
              loading={durationLoading}
              list={durationList}
              keyExtract="timeSpent"
              extraInfo={{ label: 'Average', value: `${round(durationAverage)} min / day` }}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 45,
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
