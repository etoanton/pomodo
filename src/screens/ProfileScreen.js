import React, { useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppStateContext from '../AppStateContext';
import Button from '../components/Button';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';

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
        <View style={styles.settingsList}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsTitleContainer}>
              <Text style={styles.settingsValue}>Email:</Text>
            </View>
            <View style={styles.settingsValueContainer}>
              <Text style={styles.settingsValue}>{user && user.email}</Text>
            </View>
          </View>
        </View>
        
        <Button label="Sign Out" onPress={logout} />
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
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  settingsList: {
    paddingTop: 45,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsTitleContainer: {},
  settingsValueContainer: {},
  settingsValue: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
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