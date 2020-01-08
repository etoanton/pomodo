import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { MAIN_BACKGROUND_COLOR, BACKGROUND_DARK_COLOR } from '../styles/colors';

const SIGN_IN = 0;
const SIGN_UP = 1;

const commonInputProps = {
  clearButtonMode: 'while-editing',
  autoCorrect: false,
  keyboardAppearance: 'dark',
  maxLength: 50,
  placeholderTextColor: '#535353',
  spellCheck: false,
};

const emailCommonProps = {
  keyboardType: 'email-address',
  placeholder: 'Email',
  textContentType: 'username',
  autoCapitalize: 'none',
};

const passwordCommonProps = {
  placeholder: 'Password',
  secureTextEntry: true,
  textContentType: 'password',
};

const SignInScreen = ({ navigation }) => {
  const [authType, setAuthType] = useState(SIGN_IN);
  const [email, onChangeEmail] = useState('');
  const [passwordSignIn, onChangePasswordSignIn] = useState('');
  const [passwordSignUp, onChangePasswordSignUp] = useState('');
  const [passwordSignUpRepeat, onChangePasswordSignUpRepeat] = useState('');

  const setSignInTab = () => {
    onChangePasswordSignUp('');
    onChangePasswordSignUpRepeat('');
    setAuthType(SIGN_IN);
  };

  const setSignUpTab = () => {
    onChangePasswordSignIn('');
    setAuthType(SIGN_UP);
  };


  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.closeBtnIcon}
              name="md-close"
              size={32}
              color="#F1F1F1"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={{
              ...styles.tabContainer,
              borderBottomColor: authType === SIGN_IN ? '#ccc' : MAIN_BACKGROUND_COLOR,
            }}
            onPress={setSignInTab}
          >
            <Text style={styles.tabText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tabContainer,
              borderBottomColor: authType === SIGN_UP ? '#ccc' : MAIN_BACKGROUND_COLOR,
            }}
            onPress={setSignUpTab}
          >
            <Text style={styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        { authType === SIGN_IN && <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              {...commonInputProps}
              {...emailCommonProps}
              autoCompleteType="username"
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              {...commonInputProps}
              {...passwordCommonProps}
              autoCompleteType="password"
              style={styles.input}
              value={passwordSignIn}
              onChangeText={onChangePasswordSignIn}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {}}
            >
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View> }

        { authType === SIGN_UP && <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              {...commonInputProps}
              {...emailCommonProps}
              autoFocus
              autoCompleteType="username"
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              {...commonInputProps}
              {...passwordCommonProps}
              style={styles.input}
              value={passwordSignUp}
              onChangeText={onChangePasswordSignUp}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              {...commonInputProps}
              {...passwordCommonProps}
              placeholder="Repeat password"
              textContentType="newPassword"
              style={styles.input}
              value={passwordSignUpRepeat}
              onChangeText={onChangePasswordSignUpRepeat}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {}}
            >
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View> }
      </View>
    </SafeAreaView>
  );
}

SignInScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  contentContainer: {
    paddingTop: 160,
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 10,
    right: 25,
  },
  closeBtnIcon: {

  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  tabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  formContainer: {
    paddingVertical: 30,
  },
  inputContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  submitButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    fontWeight: '300',
    fontSize: 18,
    color: '#fff',
    backgroundColor: BACKGROUND_DARK_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
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
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});  

export default SignInScreen;
