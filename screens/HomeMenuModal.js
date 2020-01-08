import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { MAIN_BACKGROUND_COLOR } from '../styles/colors';

const HomeMenuModal = ({ navigation }) => (
  <SafeAreaView style={styles.screenContainer}>
    <TouchableWithoutFeedback
      style={styles.screenUnderlay}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Statistics</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#27272E',
  },
  screenUnderlay: {
    backgroundColor: 'red'
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 80,
  },
  menuItem: {
    backgroundColor: MAIN_BACKGROUND_COLOR,
    paddingVertical: 20,
    marginBottom: 10,
  },
  menuText: {
    fontWeight: '300',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeMenuModal;

