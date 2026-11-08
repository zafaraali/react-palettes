import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  return (
    <label className='theme-toggle'>
      <span className='theme-toggle-label'>Theme</span>
      <select
        aria-label='Choose color theme'
        value={themeMode}
        onChange={(event) => setThemeMode(event.target.value)}
      >
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
    </label>
  );
}
