import React, { useContext } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import ThemeContext from '../ThemeContext';

export default function EmojiPicker({ onSelect }) {
  const { themeMode } = useContext(ThemeContext);
  return <Picker data={data} onEmojiSelect={onSelect} theme={themeMode === 'system' ? 'auto' : themeMode} set='native' />;
}
