import sizes from './sizes';
import chroma from 'chroma-js';
export default {
  root: {
    width: '20%',
    height: '25%',
    margin: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    transition: 'filter 160ms ease',
    '&:hover': { filter: 'brightness(1.06)' },
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.3)'
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
      height: '60px'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '52px'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0px',
    top: '0px',
    padding: '0 12px',
    color: props =>
      chroma(props.color).luminance() <= 0.15 ? 'white' : 'rgba(0, 0, 0, 0.65)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    '& span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginRight: '8px'
    }
  },
  deleteIcon: {
    padding: '6px',
    color: 'inherit',
    transition: 'all 0.2s ease-in-out',
    '& svg': {
      fontSize: '20px'
    }
  }
};
