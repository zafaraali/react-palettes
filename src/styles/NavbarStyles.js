import sizes from './sizes';
export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '60px',
    padding: '0 18px',
    gap: '14px',
    background: '#ffffff',
    borderBottom: '1px solid #eaecf0',
    boxShadow: '0 2px 10px rgba(16,24,40,.04)',
    zIndex: 2,
    position: 'relative',
    flexShrink: 0,
    [sizes.down('sm')]: {
      flexWrap: 'wrap',
      padding: '8px 14px',
      gap: '10px'
    },
    [sizes.down('xs')]: {
      padding: '8px 12px',
      gap: '8px'
    }
  },
  logo: {
    padding: '7px 11px',
    backgroundColor: '#f2f4f7',
    borderRadius: '10px',
    fontSize: '17px',
    fontWeight: 800,
    letterSpacing: '-.03em',
    whiteSpace: 'nowrap',
    '& a': { textDecoration: 'none', color: '#182230' },
    [sizes.down('xs')]: {
      fontSize: '15px',
      padding: '6px 10px'
    }
  },
  levelControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    [sizes.down('sm')]: {
      order: 3,
      width: '100%',
      paddingTop: '2px'
    }
  },
  slider: {
    width: '280px',
    margin: '0 10px',
    display: 'inline-block',
    '& .rc-slider-track': { backgroundColor: '#d0d5dd' },
    '& .rc-slider-rail': { height: '6px', backgroundColor: '#eaecf0' },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': {
      backgroundColor: '#4f46e5',
      outline: 'none',
      border: '2px solid #4f46e5',
      boxShadow: '0 0 0 4px rgba(79,70,229,.14)',
      width: '16px',
      height: '16px',
      marginTop: '-5px'
    },
    [sizes.down('md')]: { width: '180px' },
    [sizes.down('sm')]: { flex: 1, width: 'auto', margin: '0 4px 0 8px' }
  },
  level: {
    color: '#667085',
    fontSize: '0.78rem',
    whiteSpace: 'nowrap',
    '& strong': { color: '#182230' }
  },
  selectContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f9fafb',
    border: '1px solid #eaecf0',
    borderRadius: '9px',
    padding: '3px 8px',
    minWidth: 0,
    [sizes.down('xs')]: {
      marginLeft: 'auto',
      padding: '2px 6px',
      maxWidth: '60%'
    }
  },
  formatLabel: {
    color: '#667085',
    fontSize: '0.72rem',
    fontWeight: 700,
    [sizes.down('sm')]: { display: 'none' }
  },
  formatSelect: {
    fontSize: '0.8rem',
    minWidth: 0,
    '& .MuiSelect-select': {
      paddingTop: '6px',
      paddingBottom: '6px',
      [sizes.down('xs')]: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.75rem'
      }
    }
  }
};
