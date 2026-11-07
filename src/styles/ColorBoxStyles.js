import chroma from 'chroma-js';
import sizes from './sizes';
// Keep dark text for genuinely light swatches only; mid-tone colors stay white.
const readableText = color => chroma(color).luminance() > 0.55 ? 'black' : 'white';
export default {
  colorBox: { width: '20%', height: props => (props.showingFullPalette ? '25%' : '50%'), margin: '0 auto', display: 'inline-block', position: 'relative', cursor: 'pointer', marginBottom: '-4px', '&:hover button, &:focus-within button': { opacity: '1' }, [sizes.down('lg')]: { width: '25%', height: props => (props.showingFullPalette ? '20%' : '33.33333%') }, [sizes.down('md')]: { width: '50%', height: props => (props.showingFullPalette ? '10%' : '20%') }, [sizes.down('xs')]: { width: '100%', height: props => (props.showingFullPalette ? '5%' : '10%') } },
  copyText: { color: props => readableText(props.background) },
  colorName: { color: props => readableText(props.background) },
  seeMore: { background: 'rgba(255, 255, 255, 0.3)', position: 'absolute', border: 'none', right: '0px', bottom: '0px', color: props => readableText(props.background), width: '60px', height: '30px', textAlign: 'center', lineHeight: '30px', textTransform: 'uppercase' },
  copyButton: { color: props => readableText(props.background), width: '100px', height: '30px', position: 'absolute', display: 'inline-block', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-15px', textAlign: 'center', outline: 'none', background: 'rgba(255, 255, 255, 0.3)', fontSize: '1rem', lineHeight: '30px', textTransform: 'uppercase', opacity: '0.85', cursor: 'pointer', textDecoration: 'none', border: '1px solid rgba(255,255,255,.35)', borderRadius: '6px' },
  boxContent: { position: 'absolute', width: '100%', left: '0px', bottom: '0px', padding: '10px', color: 'black', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px' },
  copyMsg: { position: 'absolute', left: '50%', bottom: '52px', padding: '10px 14px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.88)', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.8rem', transform: 'translate(-50%, 10px)', opacity: '0', color: 'white', pointerEvents: 'none', '& strong': { fontWeight: 700 } },
  showMsg: { opacity: '1', transform: 'translate(-50%, 0)', zIndex: '20', transition: 'all 0.2s ease-in-out' }
};
