import { AsyncStorage } from 'react-native';
import { ENV } from '../config';

const Tasks = {
  async saveCompletedTasks({ taskNotes, tagId, timeSpent }) {
    try {
      const token = await AsyncStorage.getItem('@Auth:token');
      const response = await fetch(`${ENV.apiUrl}/v1/completedTasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          taskNotes,
          tagId,
          timeSpent,
        }),
      });
      const data = await response.json();
  
      return { data };
    } catch (e) {
      console.log('Error occured while making request', e);
      return { error: e };
    }
  },
};

export default Tasks;
