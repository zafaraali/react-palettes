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
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {
    marginRight: '0rem',
    '& a': {
      textDecoration: 'none'
    },
    [sizes.down('xs')]: {
      marginRight: '0'
    }
  },
  button: {
    margin: '0 0.5rem',
    [sizes.down('md')]: {
      margin: '0 0.1rem'
    },
    [sizes.down('sm')]: {
      margin: '0 0.1rem',
      padding: '0 0.35rem'
    }
  }
});

export default styles;
