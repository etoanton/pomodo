import fetchData from './helpers/fetchData';

const Users = {
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
