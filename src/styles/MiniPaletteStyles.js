export default {
  root: { backgroundColor: 'white', border: '1px solid #eaecf0', borderRadius: '16px', padding: '8px', position: 'relative', boxShadow: '0 4px 16px rgba(16, 24, 40, 0.05)', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { cursor: 'pointer', transform: 'translateY(-4px)', boxShadow: '0 14px 28px rgba(16, 24, 40, 0.11)' }, '&:hover $deleteIcon, &:focus-within $deleteIcon': { opacity: '1' } },
  colors: { backgroundColor: '#dae1e4', height: '190px', width: '100%', borderRadius: '10px', overflow: 'hidden' },
  title: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, color: '#182230', padding: '12px 6px 5px', fontSize: '0.95rem', fontWeight: 700, position: 'relative' },
  emoji: { marginLeft: '0.5rem', fontSize: '1.5rem' },
  miniColor: { height: '25%', width: '20%', display: 'inline-block', margin: '0 auto', position: 'relative', marginBottom: '-4px' },
  deleteIcon: { color: '#667085', backgroundColor: '#fff', width: '32px', height: '32px', position: 'absolute', right: '13px', top: '13px', padding: '7px', zIndex: '10', opacity: '0', borderRadius: '8px', boxShadow: '0 4px 10px rgba(16, 24, 40, 0.16)', transition: 'all 0.2s ease-in-out', '& svg': { fontSize: '17px' }, '@media (hover: none)': { opacity: '1' } }
};
