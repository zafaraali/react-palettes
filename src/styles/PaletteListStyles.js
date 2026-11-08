import sizes from './sizes';
export default {
  root: {
    backgroundColor: 'var(--page-bg)',
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflowY: 'auto',
    color: 'var(--text)',
    padding: '52px 0 72px',
    boxSizing: 'border-box',
    [sizes.down('sm')]: { padding: '36px 0 80px' },
    [sizes.down('xs')]: { padding: '24px 0 112px' }
  },
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.05em',
    margin: '6px 0 10px',
    fontWeight: 800
  },
  container: {
    width: 'min(1180px, calc(100% - 48px))',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xs')]: { width: 'calc(100% - 24px)', paddingTop: '4px' }
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    color: 'var(--text)',
    marginBottom: '34px',
    gap: '20px',
    [sizes.down('sm')]: {
      alignItems: 'stretch',
      flexDirection: 'column',
      marginBottom: '24px',
      gap: '16px'
    }
  },
  intro: {
    color: '#667085',
    fontSize: '0.76rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    margin: 0
  },
  description: { color: '#667085', fontSize: '0.95rem', margin: 0 },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [sizes.down('sm')]: {
      width: '100%',
      '& > *': { flex: 1, minWidth: 0 }
    }
  },
  emptyState: {
    width: '100%',
    textAlign: 'center',
    background: 'var(--surface)',
    border: '1px dashed var(--border-strong)',
    borderRadius: '18px',
    padding: '72px 24px',
    '& h2': { margin: '16px 0 8px', fontSize: '1.4rem' },
    '& p': { color: '#667085', margin: 0 }
  },
  emptyIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    background: '#eef2ff',
    color: '#4f46e5',
    fontSize: '1.6rem'
  },
  emptyButton: {
    marginTop: '24px',
    background: 'var(--action-bg)',
    color: '#fff',
    borderRadius: '9px',
    textTransform: 'none',
    textDecoration: 'none',
    '&:hover': { background: '#344054', color: '#fff' }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '22px',
    [sizes.down('md')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    [sizes.down('xs')]: { gridTemplateColumns: '1fr', gap: '16px' }
  },
  resetPalettes: {
    color: '#667085',
    textTransform: 'none',
    fontWeight: 600,
    padding: '10px 16px',
    borderRadius: '10px',
    '&:hover': { backgroundColor: '#eaecf0' }
  },
  createPalettes: {
    backgroundColor: 'var(--action-bg)',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 18px',
    textTransform: 'none',
    fontWeight: 700,
    boxShadow: '0 6px 14px rgba(24, 34, 48, 0.16)',
    textDecoration: 'none',
    '&:hover': { backgroundColor: '#344054', color: 'white' }
  }
};
