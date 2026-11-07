import sizes from './sizes';
export default {
  '@global': { '.fade-exit': { opacity: 1 }, '.fade-exit-active': { opacity: 0, transition: 'opacity 500ms ease-out' } },
  root: { backgroundColor: '#f6f7fb', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', color: '#182230', padding: '52px 0 72px', boxSizing: 'border-box' },
  heading: { fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.05em', margin: '8px 0 10px', fontWeight: 800 },
  container: { width: 'min(1180px, calc(100% - 48px))', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', flexWrap: 'wrap', [sizes.down('xs')]: { width: 'calc(100% - 32px)', paddingTop: '8px' } },
  nav: { display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end', color: '#182230', marginBottom: '34px', gap: '24px', [sizes.down('sm')]: { alignItems: 'flex-start', flexDirection: 'column', marginBottom: '24px' } },
  intro: { color: '#667085', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 },
  description: { color: '#667085', fontSize: '1rem', margin: 0 },
  actions: { display: 'flex', alignItems: 'center', gap: '10px' },
  emptyState: { width: '100%', textAlign: 'center', background: '#fff', border: '1px dashed #d0d5dd', borderRadius: '18px', padding: '72px 24px', '& h2': { margin: '16px 0 8px', fontSize: '1.4rem' }, '& p': { color: '#667085', margin: 0 } },
  emptyIcon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '16px', background: '#eef2ff', color: '#4f46e5', fontSize: '1.6rem' },
  emptyButton: { marginTop: '24px', background: '#182230', color: '#fff', borderRadius: '9px', textTransform: 'none', '& a': { color: 'inherit', textDecoration: 'none' } },
  palettes: { boxSizing: 'border-box', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '22px', [sizes.down('md')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }, [sizes.down('xs')]: { gridTemplateColumns: '1fr', gap: '16px' } },
  resetPalettes: { color: '#667085', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#eaecf0' } },
  createPalettes: { backgroundColor: '#182230', color: 'white', borderRadius: '10px', padding: '11px 18px', textTransform: 'none', fontWeight: 700, boxShadow: '0 6px 14px rgba(24, 34, 48, 0.16)', '&:hover': { backgroundColor: '#344054' }, '& a': { color: 'inherit', textDecoration: 'none' } }
};
