import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

import { TextInput, Button } from '../components';

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isEmailVerified, setEmailVerified] = useState(false);

  const signOut = () => {
    firebase.auth().signOut();
    navigation.replace('SignIn');
  };

  const sendEmailVerification = async () => {
    const { currentUser } = firebase.auth();
    await currentUser.sendEmailVerification();
    console.log('NOTIFICATION: Notification sent');
  };

  const saveUserInfo = async () => {
    const { currentUser } = firebase.auth();
    if (!isEmailVerified && currentUser.email !== userEmail) {
      try {
        await currentUser.updateEmail(userEmail);
        console.log('NOTIFICATION: User email updated');
      } catch (error) {
        console.error('NOTIFICATION: Failed to update email address', error);
      }
    }

    if (currentUser.displayName !== userName) {
      try {
        await currentUser.updateProfile({ displayName: userName });
        console.log('NOTIFICATION: User info updated');
      } catch (error) {
        console.error('NOTIFICATION: Failed to update email address', error);
      }
    }
  };

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
          <View style={styles.settingsGroupContainer}>
            <View style={styles.settingsTitleContainer}>
              <Text style={styles.settingsTitle}>Contacts</Text>
            </View>
            <View style={styles.settingsGroup}>
              <View style={styles.settingsValueContainer}>
                <TextInput
                  placeholder="Display name"
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
              <View style={styles.settingsValueContainer}>
                <TextInput
                  editable={!isEmailVerified}
                  autoFocus={false}
                  type="email"
                  value={userEmail}
                  onChangeText={setUserEmail}
                />
              </View>
            </View>
            {!isEmailVerified && (
              <View style={styles.settingsExtraLabelContainer}>
                <Text style={styles.settingsExtraLabel}>Email address is not verified</Text>
                <TouchableOpacity onPress={sendEmailVerification}>
                  <Text style={styles.settingsExtraLabelActionText}>Resend</Text>
                </TouchableOpacity>
              </View>
            )}
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

const INPUT_GROUP_H_PADDING = 12;
const INPUT_GROUP_V_PADDING = 12;

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
  settingsGroupContainer: {},
  settingsTitleContainer: {
    marginBottom: 10,
    marginLeft: INPUT_GROUP_H_PADDING,
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  settingsGroup: {
    paddingLeft: INPUT_GROUP_H_PADDING,
    paddingRight: INPUT_GROUP_H_PADDING,
    paddingBottom: INPUT_GROUP_V_PADDING,
    borderRadius: 15,
    backgroundColor: '#3e3f4d',
  },
  settingsValueContainer: {
    marginTop: INPUT_GROUP_V_PADDING,
  },
  settingsExtraLabelContainer: {
    marginTop: 8,
    marginHorizontal: INPUT_GROUP_H_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsExtraLabel: {
    color: '#a3a3a3',
    fontSize: 14,
  },
  settingsExtraLabelAction: {},
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
