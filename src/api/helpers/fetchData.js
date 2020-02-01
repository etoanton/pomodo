import { AsyncStorage } from 'react-native';
import { ENV } from '../../config';

const TOKEN_KEY = '@Auth:token';
const API_URL = ENV.apiUrl;

// TODO: Handle 'token expired' case: Reissue new token using refreshToken

const fetchData = async ({ url, method = 'GET', headers, body }) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    const payload = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    }

    const response = await fetch(`${API_URL}${url}`, payload);
    return response.json();
  } catch (e) {
    console.log(`Error occured while making ${url} request`, e);
    throw e;
  }
};

export default fetchData;