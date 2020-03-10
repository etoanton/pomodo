import fetchData from './helpers/fetchData';

const Pomodos = {
  async getPomodos() {
    try {
      const { data } = await fetchData({ url: '/v1/pomodos' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
  async getPomodo(date) {
    try {
      const { data } = await fetchData({ url: `/v1/pomodos/${date}` });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
  async savePomodo({
    sessionNotes,
    tagId,
    sessionDuration,
    sessionsCount,
    startedAt,
    finishedAt,
  }) {
    try {
      const body = {
        sessionNotes,
        tagId,
        sessionDuration,
        sessionsCount,
        startedAt,
        finishedAt,
      };
      const { data } = await fetchData({ url: '/v1/pomodos', method: 'POST', body });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Pomodos;
