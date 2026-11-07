import { DRAWER_WIDTH } from '../consts';
import sizes from './sizes';

const styles = theme => ({
  root: {
    display: 'flex',
    background: '#f6f7fb',
    minHeight: '100vh',
    overflowX: 'hidden'
  },

  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    [sizes.down('sm')]: {
      width: '100%',
      position: 'relative'
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
    background: '#fff',
    borderRight: '1px solid #eaecf0',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    [sizes.down('sm')]: {
      width: '100%',
      zIndex: 1200
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
    color: '#182230',
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
    height: '100vh',
    padding: 0,
    boxSizing: 'border-box',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH,
    overflowY: 'auto',
    overflowX: 'hidden',
    [sizes.down('sm')]: {
      marginLeft: '-100%',
      height: '100vh',
      paddingBottom: '80px'
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: 'calc(100% - 40px)',
    minHeight: '100%',
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
      color: '#182230',
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
      gap: '4px'
    }
  },
  button: {
    width: '100%',
    margin: 0,
    borderRadius: '9px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '0.75rem',
    padding: '6px 4px',
    whiteSpace: 'nowrap',
    [sizes.down('xs')]: {
      fontSize: '0.7rem',
      padding: '5px 2px'
    }
  }
});

export default styles;
