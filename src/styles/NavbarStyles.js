import sizes from './sizes';
export default {
  Navbar: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minHeight: '64px', padding: '0 18px', gap: '18px', background: '#ffffff', borderBottom: '1px solid #eaecf0', boxShadow: '0 2px 10px rgba(16,24,40,.04)', zIndex: 2, position: 'relative' },
  logo: { padding: '9px 13px', backgroundColor: '#f2f4f7', borderRadius: '10px', fontSize: '18px', fontWeight: 800, letterSpacing: '-.03em', whiteSpace: 'nowrap', '& a': { textDecoration: 'none', color: '#182230' }, [sizes.down('xs')]: { display: 'none' } },
  levelControl: { display: 'flex', alignItems: 'center', gap: '8px' },
  slider: { width: '280px', margin: '0 10px', display: 'inline-block', '& .rc-slider-track': { backgroundColor: '#d0d5dd' }, '& .rc-slider-rail': { height: '6px', backgroundColor: '#eaecf0' }, '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': { backgroundColor: '#4f46e5', outline: 'none', border: '2px solid #4f46e5', boxShadow: '0 0 0 4px rgba(79,70,229,.14)', width: '16px', height: '16px', marginTop: '-5px' }, [sizes.down('sm')]: { width: '130px' } },
  level: { color: '#667085', fontSize: '0.78rem', whiteSpace: 'nowrap', '& strong': { color: '#182230' } },
  selectContainer: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1px solid #eaecf0', borderRadius: '9px', padding: '3px 10px' },
  formatLabel: { color: '#667085', fontSize: '0.72rem', fontWeight: 700, [sizes.down('sm')]: { display: 'none' } },
  formatSelect: { fontSize: '0.82rem' }
};
