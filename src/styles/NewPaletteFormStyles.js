import { DRAWER_WIDTH } from '../consts';
import sizes from './sizes';

const styles = (theme) => ({
  root: {
    display: 'flex',
    background: 'var(--page-bg)',
    minHeight: '100vh',
    overflowX: 'hidden'
  },

  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    [sizes.down('sm')]: {
      width: 0
    }
  },
  drawerPaper: {
    color: 'var(--text)',
    width: DRAWER_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    [sizes.down('sm')]: {
      width: '100%',
      height: '100dvh',
      maxHeight: '100dvh',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 12px',
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    flexShrink: 0,
    boxSizing: 'border-box',
    [sizes.down('xs')]: {
      minHeight: '48px !important',
      height: '48px',
      padding: '0 8px'
    }
  },
  drawerTitle: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: 'var(--text)',
    display: 'none',
    [sizes.down('sm')]: {
      display: 'block'
    }
  },
  closeDrawerBtn: {
    textTransform: 'none',
    fontWeight: 700,
    color: '#4f46e5',
    borderRadius: '8px',
    fontSize: '0.85rem'
  },
  contentNavSpacer: {
    height: '64px',
    minHeight: '64px',
    flexShrink: 0,
    ...theme.mixins.toolbar,
    [sizes.down('sm')]: {
      height: '70px',
      minHeight: '70px'
    },
    [sizes.down('xs')]: {
      height: '108px',
      minHeight: '108px'
    }
  },
  content: {
    flexGrow: 1,
    height: '100dvh',
    padding: 0,
    boxSizing: 'border-box',
    marginLeft: -DRAWER_WIDTH,
    overflowY: 'auto',
    overflowX: 'hidden',
    [sizes.down('sm')]: {
      marginLeft: 0,
      width: '100%',
      flexShrink: 0,
      height: '100dvh',
      paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))'
    }
  },
  contentShift: {
    marginLeft: 0
  },
  container: {
    width: 'calc(100% - 40px)',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: '16px 0 32px',
    margin: '0 auto',
    boxSizing: 'border-box',
    [sizes.down('xs')]: {
      width: 'calc(100% - 24px)',
      padding: '10px 0 24px'
    },
    '& h4': {
      fontSize: '1.65rem',
      fontWeight: 800,
      letterSpacing: '-.04em',
      color: 'var(--text)',
      margin: '0 0 12px',
      [sizes.down('xs')]: {
        fontSize: '1.25rem',
        margin: '0 0 8px'
      }
    }
  },
  buttons: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '6px',
    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gap: '6px'
    }
  },
  button: {
    width: '100%',
    margin: 0,
    borderRadius: '9px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '0.75rem',
    minHeight: 44,
    padding: '6px 4px',
    whiteSpace: 'nowrap',
    [sizes.down('xs')]: {
      fontSize: '0.7rem',
      padding: '5px 2px'
    }
  }
});

export default styles;
