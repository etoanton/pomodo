import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { Users } from './src/api';
import RootNavigator from './src/navigation/Root';
import AppStateContext from './src/AppStateContext';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('@Auth:token');
  }

  useEffect(() => {
    async function validateAuthentification() {
      try {
        const token = await AsyncStorage.getItem('@Auth:token');
        if (token) {
          const { data } = await Users.userInfo();
          setUser(data)
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    }
    validateAuthentification();
  }, []);

  return (
    <AppStateContext.Provider value={{ user, loading, logout }}>
      <RootNavigator />
    </AppStateContext.Provider>
  );
};

export default App;


