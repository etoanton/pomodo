import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';

import { MAIN_BACKGROUND_COLOR } from '../styles/colors';

const HomeMenuModal = ({ navigation }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let didCancel = false;

    firebase.auth().onAuthStateChanged(user => {
      if (!didCancel) {
        const loggedIn = user && !user.isAnonymous;
        setLoggedIn(loggedIn);
      }
    });

    return () => {
      didCancel = true;
    };
  }, []);

  const navigateToProfile = () => {
    if (isLoggedIn) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableWithoutFeedback
        style={styles.screenUnderlay}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToProfile}
          >
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {}}
          >
            <Text style={styles.menuText}>Statistics</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
  },
  screenUnderlay: {
    backgroundColor: 'red',
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 80,
  },
  menuItem: {
    backgroundColor: '#2F2F38',
    borderLeftColor: '#27272E',
    borderLeftWidth: 10,
    paddingVertical: 20,
    marginBottom: 10,
  },
  menuText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    paddingLeft: 20,
  },
});

HomeMenuModal.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeMenuModal;
