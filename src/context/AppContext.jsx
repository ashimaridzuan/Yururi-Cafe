import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [mascotMood, setMascotMood] = useState('waving');
  const [mascotMessage, setMascotMessageState] = useState(
    'こんにちは！ I\'m Snoopy Nova, your Japanese teacher! Welcome to Yururi Cafe ゆるりカフェ!'
  );

  const setMascotMessage = useCallback((message, mood = 'happy') => {
    setMascotMood(mood);
    setMascotMessageState(message);
  }, []);

  return (
    <AppContext.Provider value={{ mascotMood, mascotMessage, setMascotMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
