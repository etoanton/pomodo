import fetchData from './helpers/fetchData';

const Insights = {
  async getCount() {
    try {
      const { data } = await fetchData({ url: '/v1/insights/count' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
  async getDuration() {
    try {
      const { data } = await fetchData({ url: '/v1/insights/duration' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Insights;
