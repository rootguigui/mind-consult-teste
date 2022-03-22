import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getToken();
  }, [isAuthenticated, token, isAdmin]);

  const getToken = async () => {
    try {
      try {
        const result = await AsyncStorage.getItem('token');
        const resultIsAdmin = await AsyncStorage.getItem('isAdmin');
        setIsAdmin(resultIsAdmin === "true");
        if (result) {
          setIsAuthenticated(true);
          setToken(result);
        }
      }
      catch {}
    } 
    catch(ex) { setIsAuthenticated(false); setToken(null); setIsAdmin(false) }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setToken(null);
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, logout, isAdmin, setIsAdmin }}>
      { children }
    </AuthContext.Provider>
  );
}
export const useAuthValues = () => useContext(AuthContext);