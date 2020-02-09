import * as firebase from 'firebase';
import fetchData from './helpers/fetchData';

const Users = {
  async login(email, password) {
    // TODO: Merge anonymous & existing user

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.log('Error while trying to login user', error);
      return false;
    }
  },
  async createUser(email, password) {
    try {
      // TODO: Merge anonymous & new user

      const { token } = await fetchData({ url: '/v1/users', method: 'POST', body: { email, password } });
      if (!token) throw Error('Failed to sign up, token is null');
      await firebase.auth().signInWithCustomToken(token);
      return true;
    } catch (error) {
      console.log('Error while trying to create user', error);
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
};

export default Users;
