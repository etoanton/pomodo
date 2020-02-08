import * as firebase from 'firebase';

import { ENV } from '../../config';

const API_URL = ENV.apiUrl;

const fetchData = async ({
  url,
  method = 'GET',
  headers,
  body,
}) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken(true);

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

    console.log('fetchData:', method, url);

    return data;
  } catch (e) {
    console.log(`Error occured while making ${url} request`, e);
    throw e;
  }
};

export default fetchData;
