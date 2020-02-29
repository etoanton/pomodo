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
  async savePomodo({ taskNotes, tagId, timeSpent }) {
    try {
      const body = { taskNotes, tagId, timeSpent };
      const { data } = await fetchData({ url: '/v1/pomodos', method: 'POST', body });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Pomodos;
