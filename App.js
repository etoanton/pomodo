import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import RootNavigator from './src/navigation/Root';
import AppStateContext from './src/AppStateContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function validateAuthentification() {
      const token = await AsyncStorage.getItem('@Auth:token');
      if (token) {
        // TODO: Fetch userData
        setUser({
          email: 'a@a.aa',
          firstName: 'John',
          lastName: 'Doe',
        })
      } else {
        setUser(null);
      }
    }
    validateAuthentification();
  }, []);

  return (
    <AppStateContext.Provider value={{ user }}>
      <RootNavigator />
    </AppStateContext.Provider>
  );
};

export default App;


