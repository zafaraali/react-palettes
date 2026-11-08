import React from 'react';
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DraggableColorBox from './DraggableColorBox';
import '../styles/DraggableColorList.css';

export default function DraggableColorList({ colors, removeColor, onSortEnd }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const names = colors.map(color => color.name);
  const position = id => names.indexOf(id) + 1;
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}
      accessibility={{
        screenReaderInstructions: { draggable: 'Press Space or Enter to pick up a color. Use arrow keys to move it, Space or Enter to drop, or Escape to cancel.' },
        announcements: {
          onDragStart: ({ active }) => `Picked up ${active.id}, position ${position(active.id)} of ${colors.length}.`,
          onDragOver: ({ active, over }) => over ? `${active.id} is over position ${position(over.id)} of ${colors.length}.` : undefined,
          onDragEnd: ({ active, over }) => `Dropped ${active.id} at position ${position(over ? over.id : active.id)} of ${colors.length}.`,
          onDragCancel: ({ active }) => `Cancelled moving ${active.id}. Its position is unchanged.`
        }
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) onSortEnd({ oldIndex: names.indexOf(active.id), newIndex: names.indexOf(over.id) });
      }}>
      <SortableContext items={names} strategy={rectSortingStrategy}>
        <div className='draggable-colors' role='list' aria-label='Palette colors'>
          {colors.map(color => <DraggableColorBox key={color.name} name={color.name} color={color.color} handleClick={() => removeColor(color.name)} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
}
