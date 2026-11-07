import React from 'react';
import '../styles/Page.css';
import ThemeToggle from './ThemeToggle';
export default function Page(props) {
  return (
    <section className='page'>
      {props.children}
      <ThemeToggle />
    </section>
  );
}
