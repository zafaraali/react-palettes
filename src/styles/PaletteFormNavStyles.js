import { DRAWER_WIDTH } from '../consts';
import sizes from './sizes';
const styles = theme => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '64px',
    backgroundColor: '#ffffff',
    color: '#182230',
    borderBottom: '1px solid #eaecf0',
    boxShadow: '0 2px 10px rgba(16, 24, 40, 0.04)',
    padding: '0 14px',
    [sizes.down('xs')]: {
      flexWrap: 'wrap',
      minHeight: 'auto',
      padding: '6px 10px',
      '& .MuiToolbar-root': {
        width: '100%',
        minHeight: '48px',
        padding: 0
      }
    }
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [sizes.down('sm')]: { width: 'calc(100% - 100vw)', marginLeft: '100vw' }
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 12,
    color: '#667085'
  },
  navBtns: {
    marginRight: '0rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    '& a': {
      textDecoration: 'none'
    },
    [sizes.down('xs')]: {
      width: '100%',
      marginRight: '0',
      paddingBottom: '4px',
      '& > *, & > a': { flex: 1, minWidth: 0 },
      '& .MuiButton-root': { width: '100%' }
    }
  },
  button: {
      margin: 0,
      borderRadius: '9px',
      textTransform: 'none',
      fontWeight: 700,
    [sizes.down('md')]: {
      margin: '0 0.1rem'
    },
    [sizes.down('sm')]: {
      margin: '0 0.1rem',
      padding: '0 0.45rem',
      minWidth: 'auto'
    }
  }
});

export default styles;
