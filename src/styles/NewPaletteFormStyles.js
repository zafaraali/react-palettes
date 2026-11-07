import { DRAWER_WIDTH } from '../consts';
import sizes from './sizes';

const styles = theme => ({
  root: {
    display: 'flex',
    background: '#f6f7fb',
    minHeight: '100vh',
    [sizes.down('sm')]: { overflow: 'visible' }
  },

  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    [sizes.down('sm')]: { width: '100vw' }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
    background: '#fff',
    borderRight: '1px solid #eaecf0',
    maxWidth: '100vw',
    [sizes.down('sm')]: { width: '100vw' }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH,
    [sizes.down('sm')]: {
      marginLeft: '-100vw',
      height: 'calc(100vh - 90px)',
      overflowY: 'auto',
      paddingBottom: '88px'
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '22px 0 32px',
    '& h4': { fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-.04em', color: '#182230' }
  },
  buttons: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px'
  },
  button: {
    width: '100%',
    margin: 0,
    borderRadius: '9px'
  }
});

export default styles;
