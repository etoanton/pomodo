import * as firebase from 'firebase';
import fetchData from './helpers/fetchData';

const Users = {
  async login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (e) {
      console.log('Error while trying to login user', e);
      return false;
    }
  },
  async createUser(email, password) {
    try {
      const { token } = await fetchData({ url: '/v1/users', method: 'POST', body: { email, password } });
      await firebase.auth().signInWithCustomToken(token);
      return true;
    } catch (e) {
      console.log('Error while trying to create user', e);
      return false;
    }
  },
  async userInfo() {
    try {
      const { data } = await fetchData({ url: '/v1/users/me' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Users;
