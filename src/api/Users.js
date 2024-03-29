import * as firebase from 'firebase';
import { Alert } from 'react-native';
import fetchData from './helpers/fetchData';

const Users = {
  async login(email, password) {
    try {
      const { currentUser } = firebase.auth();

      /* User already exists & successfully signed in */
      if (currentUser && !currentUser.isAnonymous) {
        return true;
      }

      /* Login user */
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      Alert.alert(error.message);
      console.log('Error while trying to login user', error);
      return false;
    }
  },
  async createUser(email, password) {
    try {
      const { currentUser } = firebase.auth();

      /* User already exists & successfully signed in */
      if (currentUser && !currentUser.isAnonymous) {
        return true;
      }

      /* Convert existing anonymous user */
      if (currentUser && currentUser.isAnonymous) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        await firebase.auth().currentUser.linkWithCredential(credential);
        await fetchData({ url: '/v1/users/convert', method: 'POST', body: { email } });
        return true;
      }

      /* Create new user */
      const { token } = await fetchData({ url: '/v1/users', method: 'POST', body: { email, password } });
      if (!token) throw Error('Failed to sign up');
      await firebase.auth().signInWithCustomToken(token);
      return true;
    } catch (error) {
      Alert.alert(error.message);
      console.log('Error while trying to create user', error.message);
      return false;
    }
  },
  async createTemporaryUser() {
    try {
      const { user } = await firebase.auth().signInAnonymously();
      await fetchData({ url: '/v1/users/anonymous', method: 'POST', body: { externalId: user.uid } });
      return true;
    } catch (error) {
      console.log('Failed to sign in anonymously', error);
      return false;
    }
  },
  async userInfo() {
    try {
      const { data } = await fetchData({ url: '/v1/user' });
      return { data };
    } catch (error) {
      return { error };
    }
  },
};

export default Users;
