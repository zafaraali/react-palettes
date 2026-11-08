import { readableText } from '../contrast';
import sizes from './sizes';
export default (_theme, props) => ({
  colorBox: {
    width: '20%',
    height: (props.showingFullPalette ? '25%' : '50%'),
    margin: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    '&:hover button, &:focus-within button': { opacity: '1' },
    [sizes.down('lg')]: {
      width: '25%',
      height: (props.showingFullPalette ? '20%' : '33.33333%')
    },
    [sizes.down('md')]: {
      width: '50%',
      height: (props.showingFullPalette ? '10%' : '20%')
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '64px',
      minHeight: '64px',
      marginBottom: 0
    }
  },
  copyText: { color: readableText(props.background) },
  colorName: { color: readableText(props.background) },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    color: readableText(props.background, 0.3),
    width: '60px',
    height: '44px',
    textAlign: 'center',
    lineHeight: '44px',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '0.8rem',
    [sizes.down('xs')]: {
      top: '50%',
      bottom: 'auto',
      transform: 'translateY(-50%)',
      height: '44px',
      lineHeight: '44px',
      borderRadius: '6px 0 0 6px',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  },
  copyButton: {
    color: readableText(props.background, 0.3),
    width: '90px',
    height: '44px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '0.85rem',
    lineHeight: '44px',
    textTransform: 'uppercase',
    opacity: 1,
    cursor: 'pointer',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,.35)',
    borderRadius: '6px',
    [sizes.down('xs')]: {
      opacity: '1',
      width: '74px',
      height: '44px',
      lineHeight: '44px',
      fontSize: '0.75rem'
    }
  },
  boxContent: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    padding: '10px 14px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    maxWidth: 'calc(100% - 140px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    boxSizing: 'border-box',
    [sizes.down('xs')]: {
      bottom: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '11px',
      padding: '0 12px',
      maxWidth: 'calc(50% - 48px)'
    }
  },
  copyMsg: {
    position: 'absolute',
    left: '50%',
    bottom: '52px',
    padding: '10px 14px',
    borderRadius: '999px',
    background: 'rgba(15, 23, 42, 0.88)',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    fontSize: '0.8rem',
    transform: 'translate(-50%, 10px)',
    opacity: '0',
    color: 'white',
    pointerEvents: 'none',
    zIndex: '20',
    whiteSpace: 'nowrap',
    '& strong': { fontWeight: 700 }
  },
  showMsg: {
    opacity: '1',
    transform: 'translate(-50%, 0)',
    zIndex: '25',
    transition: 'all 0.2s ease-in-out'
  }
});
