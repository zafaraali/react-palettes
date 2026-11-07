import sizes from './sizes';
export default {
  picker: {
    width: '100% !important',
    marginTop: '1rem',
    borderRadius: '12px !important',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(16, 24, 40, .08)',
    boxSizing: 'border-box',
    [sizes.down('xs')]: {
      marginTop: '0.7rem'
    }
  },
  addColor: {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.6rem',
    fontSize: '0.95rem',
    borderRadius: '9px',
    textTransform: 'none',
    fontWeight: 700,
    [sizes.down('xs')]: {
      padding: '0.65rem',
      fontSize: '0.88rem'
    }
  },
  colorNameInput: {
    width: '100%',
    height: '56px',
    '& input': { padding: '16px 12px 10px' },
    [sizes.down('xs')]: {
      height: '52px',
      '& input': { padding: '14px 10px 8px', fontSize: '0.9rem' }
    }
  }
};
