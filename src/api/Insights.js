import fetchData from './helpers/fetchData';

const Insights = {
  async getCount(from, to) {
    try {
      const query = from && to ? `?from=${from}&to=${to}` : '';
      const { data } = await fetchData({ url: `/v1/insights/count${query}` });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  async getDuration(from, to) {
    try {
      const query = from && to ? `?from=${from}&to=${to}` : '';
      const { data } = await fetchData({ url: `/v1/insights/duration${query}` });
      return { data };
    } catch (error) {
      return { error };
    }
  },
};

export default Insights;
