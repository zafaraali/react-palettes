import sizes from './sizes';
import chroma from 'chroma-js';
export default {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%'
    },
    [sizes.down('sm')]: {
      width: '50%',
      height: '10%'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '-9px',
    bottom: '0px',
    padding: '10px',
    color: props =>
      chroma(props.color).luminance() <= 0.15 ? 'white' : 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
};
