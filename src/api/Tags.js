import fetchData from './helpers/fetchData';

const Tags = {
  async getTags() {
    try {
      const { data } = await fetchData({ url: '/v1/tags' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Tags;
