import { readableText } from '../contrast';
export default (_theme, props) => ({
  root: { width: '100%', height: '100%', minHeight: 64, position: 'relative', boxSizing: 'border-box' },
  boxContent: {
    position: 'absolute', inset: 0, padding: '0 8px', color: readableText(props.color),
    letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700,
    display: 'flex', alignItems: 'center', gap: 4, boxSizing: 'border-box',
    '& span': { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
  },
  dragHandle: { width: 44, height: 44, padding: 10, color: 'inherit', flexShrink: 0, touchAction: 'none', cursor: 'grab', '&:active': { cursor: 'grabbing' } },
  deleteIcon: { width: 44, height: 44, padding: 10, color: 'inherit', flexShrink: 0, '& svg': { fontSize: 20 } }
});
