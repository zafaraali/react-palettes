import sizes from './sizes';
export default {
  paletteFooter: {
    color: 'var(--footer-text)',
    backgroundColor: 'var(--surface)',
    minHeight: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    padding: '0 120px 0 18px',
    flexShrink: 0,
    borderTop: '1px solid var(--border)',
    boxSizing: 'border-box',
    [sizes.down('xs')]: {
      fontSize: '0.82rem',
      padding: '0 110px 0 12px'
    }
  },
  emoji: {
    fontSize: '1.3rem',
    marginLeft: '0.5rem'
  }
};
