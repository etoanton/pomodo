import React, { useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppStateContext from '../AppStateContext';
import { MAIN_BACKGROUND_COLOR, BACKGROUND_DARK_COLOR } from '../styles/colors';

const ProfileScreen = ({ navigation }) => {
  const { user = {}, loading, logout } = useContext(AppStateContext);

  useEffect(() => {
    if (!loading && !user) navigation.replace('SignIn');
  }, [user, loading]);

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
        <Text style={styles.text}>Email: {user && user.email}</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={logout}
        >
          <Text style={styles.submitButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );    
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: BACKGROUND_DARK_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#37853D',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;