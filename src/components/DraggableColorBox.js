import React from 'react';
import { withStyles } from 'tss-react/mui';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from '../styles/DraggableColorBoxStyles';

function DraggableColorBox({ classes, handleClick, name, color }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: name });
  return (
    <div ref={setNodeRef} className={classes.root} role='listitem' data-color-name={name}
      style={{ backgroundColor: color, transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 2 : undefined }}>
      <div className={classes.boxContent}>
        <IconButton ref={setActivatorNodeRef} className={classes.dragHandle} {...attributes} {...listeners} aria-label={`Reorder ${name}`}>
          <DragIndicatorIcon />
        </IconButton>
        <span>{name}</span>
        <IconButton className={classes.deleteIcon} onClick={handleClick} aria-label={`Remove ${name}`}><DeleteIcon /></IconButton>
      </div>
    </div>
  );
}
export default withStyles(DraggableColorBox, styles);
