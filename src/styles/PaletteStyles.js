import sizes from './sizes';
export default {
  Palette: {
    background: 'var(--palette-bg)',
    color: 'var(--palette-text)',
    height: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  colors: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  goBack: {
    width: '20%',
    height: '50%',
    margin: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    opacity: '1',
    backgroundColor: 'var(--back-bg)',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    [sizes.down('lg')]: { width: '25%', height: '33.333%' },
    [sizes.down('md')]: { width: '50%', height: '20%' },
    [sizes.down('xs')]: {
      width: '100%',
      height: '54px',
      minHeight: '54px',
      marginBottom: 0
    }
  },
  backBtn: {
    width: '100px',
    height: '44px',
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'var(--back-button-bg)',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'white',
    textTransform: 'uppercase',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    borderRadius: '6px',
    opacity: '1',
    cursor: 'pointer',
    textDecoration: 'none',
    [sizes.down('xs')]: {
      width: '120px',
      height: '44px',
      fontSize: '0.85rem'
    }
  }
};
