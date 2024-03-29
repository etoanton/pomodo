import fetchData from './helpers/fetchData';

const Pomodos = {
  async getPomodos() {
    try {
      const { data } = await fetchData({ url: '/v1/pomodos' });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  async getStats() {
    try {
      const { data } = await fetchData({ url: '/v1/pomodos/stats' });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  async getPomodo(date) {
    try {
      const { data } = await fetchData({ url: `/v1/pomodos/${date}` });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  async savePomodo({
    sessionNotes,
    tagId,
    sessionDurations,
    startedAt,
    finishedAt,
  }) {
    try {
      const body = {
        sessionNotes,
        tagId,
        sessionDurations,
        startedAt,
        finishedAt,
      };
      const { data } = await fetchData({ url: '/v1/pomodos', method: 'POST', body });
      return { data };
    } catch (error) {
      return { error };
    }
  },
};

export default Pomodos;
