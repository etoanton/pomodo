import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

import { Users, useDataFetching } from '../../api';
import { ProfileSettingsItem, InputsGroup, Button } from '../../components';

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [startOnSunday, setStartOnSunday] = useState(true);

  const { loading: userInfoLoading, results: { data } } = useDataFetching(Users.userInfo);

  useEffect(() => {
    if (data && typeof data.weekStartsOnSunday === 'boolean') {
      setStartOnSunday(data.weekStartsOnSunday);
    }
  }, [data && data.weekStartsOnSunday]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (!currentUser || currentUser.isAnonymous) {
        navigation.replace('Home');
        return;
      }

      const { email, displayName = '', emailVerified } = currentUser;

      setUserEmail(email);
      setUserName(displayName || '');
      setEmailVerified(emailVerified);
    });
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
    navigation.replace('SignIn');
  };

  const sendEmailVerification = async () => {
    const { currentUser } = firebase.auth();
    await currentUser.sendEmailVerification();
    Alert.alert('Email notification sent');
  };

  const saveUserInfo = async () => {
    const { currentUser } = firebase.auth();
    try {
      if (!isEmailVerified && currentUser.email !== userEmail) {
        await currentUser.updateEmail(userEmail);
      }
      if (currentUser.displayName !== userName) {
        await currentUser.updateProfile({ displayName: userName });
      }
      if (data && data.weekStartsOnSunday !== startOnSunday) {
        // TODO: update
        console.log('update weekStartsOnSunday');
      }
    } catch (error) {
      console.log('Failed to update user info', error);
      Alert.alert('Failed to update user info');
    }
  };

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
          <InputsGroup
            title="Contacts"
            fieldsConfig={[
              {
                placeholder: 'Display name',
                value: userName,
                onChangeText: setUserName,
              },
              {
                placeholder: 'Email',
                value: userEmail,
                onChangeText: setUserEmail,
                type: 'email',
                autoFocus: false,
                editable: !isEmailVerified,
              },
            ]}
          >
            {!isEmailVerified && (
              <View style={styles.settingsExtraLabelContainer}>
                <Text style={styles.settingsExtraLabel}>Email address is not verified</Text>
                <TouchableOpacity onPress={sendEmailVerification}>
                  <Text style={styles.settingsExtraLabelActionText}>Resend</Text>
                </TouchableOpacity>
              </View>
            )}
          </InputsGroup>
          <View style={styles.settingsGroupContainer}>
            <ProfileSettingsItem label="Week starts on Sunday">
              <Switch
                onValueChange={setStartOnSunday}
                value={startOnSunday}
                disabled={userInfoLoading}
              />
            </ProfileSettingsItem>
          </View>
        </View>

        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button label="Save" onPress={saveUserInfo} />
          </View>
          <View style={styles.actionContainer}>
            <Button label="Sign Out" onPress={signOut} btnStyles={styles.signOutBtn} />
          </View>
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  settingsList: {
    paddingTop: 45,
  },
  settingsGroupContainer: {
    marginTop: 25,
    paddingHorizontal: 5,
  },
  settingsExtraLabelContainer: {
    marginTop: 8,
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsExtraLabel: {
    color: '#a3a3a3',
    fontSize: 14,
  },
  settingsExtraLabelActionText: {
    color: '#a3a3a3',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  actionListContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  signOutBtn: {
    backgroundColor: '#373845',
  },
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
