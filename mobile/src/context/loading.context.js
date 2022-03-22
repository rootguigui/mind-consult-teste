import React, { useContext, useState } from 'react';

export const LoadingContext = React.createContext();
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      { children }
    </LoadingContext.Provider>
  );
}

export const useLoadingValues = () => useContext(LoadingContext);