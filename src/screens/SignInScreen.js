import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ENV } from '../config';
import AppStateContext from '../AppStateContext';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { TextInput } from '../components';

const SIGN_IN = 0;
const SIGN_UP = 1;

const SignInScreen = ({ navigation }) => {
  const { setUser } = useContext(AppStateContext);

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

  // TODO: Use axios + interceptors
  const signIn = () => {
    fetch(`${ENV.apiUrl}/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: passwordSignIn }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        AsyncStorage.setItem('@Auth:token', data.token);
        setUser(data.user);
        navigation.popToTop();
      });
  };

  const signUp = () => {
    fetch(`${ENV.apiUrl}/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: passwordSignUp }),
    })
      .then((response) => response.json())
      .then((data) => {
        AsyncStorage.setItem('@Auth:token', data.token);
        setUser(data.user);
        navigation.popToTop();
      });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons
            style={styles.closeBtnIcon}
            name="md-close"
            size={32}
            color="#F1F1F1"
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={styles.contentContainer} behavior="position" enabled>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={{
              ...styles.tabContainer,
              borderBottomColor: authType === SIGN_IN ? '#ccc' : '#2F3038',
            }}
            onPress={setSignInTab}
          >
            <Text style={styles.tabText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tabContainer,
              borderBottomColor: authType === SIGN_UP ? '#ccc' : '#2F3038',
            }}
            onPress={setSignUpTab}
          >
            <Text style={styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        { authType === SIGN_IN && (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                type="email"
                autoCompleteType="username"
                value={email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                type="password"
                autoCompleteType="password"
                value={passwordSignIn}
                onChangeText={onChangePasswordSignIn}
              />
            </View>
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={signIn}
              >
                <Text style={styles.submitButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) }

        { authType === SIGN_UP && (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                type="email"
                autoCompleteType="username"
                value={email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                type="password"
                value={passwordSignUp}
                onChangeText={onChangePasswordSignUp}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                type="password"
                placeholder="Repeat password"
                textContentType="newPassword"
                value={passwordSignUpRepeat}
                onChangeText={onChangePasswordSignUpRepeat}
              />
            </View>
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={signUp}
              >
                <Text style={styles.submitButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  contentContainer: {
    // paddingTop: 200,
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
  },
  closeBtnIcon: {

  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
    fontSize: 20,
    fontWeight: '500',
  },
  formContainer: {
    paddingVertical: 20,
  },
  inputContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  submitButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
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

export default SignInScreen;
