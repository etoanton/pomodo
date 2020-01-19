import fetchData from './helpers/fetchData';

const Tasks = {
  async getCompletedTasks() {
    try {
      const { data } = await fetchData({ url: '/v1/completedTasks' });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
  async saveCompletedTasks({ taskNotes, tagId, timeSpent }) {
    try {
      const body = { taskNotes, tagId, timeSpent }
      const { data } = await fetchData({ url: '/v1/completedTasks', method: 'POST', body });
      return { data };
    } catch (e) {
      return { error: e };
    }
  },
};

export default Tasks;
