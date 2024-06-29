import sizes from './sizes';
export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh'
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    backgroundColor: '#eceff1',
    fontSize: '22px',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black'
    },
    [sizes.down('xs')]: {
      display: 'none'
    }
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    marginLeft: '20px',
    '& .rc-slider-track': {
      backgroundColor: 'transparent'
    },
    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': {
      backgroundColor: 'mediumseagreen',
      outline: 'none',
      border: '2px solid mediumseagreen',
      boxShadow: 'none',
      width: '18px',
      height: '18px',
      marginTop: '-5px'
    },
    [sizes.down('sm')]: {
      width: '150px'
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem'
  },
  level: {
    paddingLeft: '5px'
  }
};
