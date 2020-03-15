import * as firebase from 'firebase';
import { Alert } from 'react-native';

import { ENV } from '../../config';

const API_URL = ENV.apiUrl;

const fetchData = async ({
  url,
  method = 'GET',
  headers,
  body,
}) => {
  try {
    let token;
    if (firebase.auth().currentUser) {
      token = await firebase.auth().currentUser.getIdToken(true);
    }

    const payload = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(`${API_URL}${url}`, payload);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data;
  } catch (error) {
    console.log(`Error occured while making ${url} request`, error);
    throw error;
  }
};

export default fetchData;
