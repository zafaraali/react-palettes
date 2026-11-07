import React from 'react';

const ThemeContext = React.createContext({
  themeMode: 'system',
  setThemeMode: () => {}
});

export default ThemeContext;
