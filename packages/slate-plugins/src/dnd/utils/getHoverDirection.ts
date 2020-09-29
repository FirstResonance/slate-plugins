import { DropTargetMonitor, XYCoord } from 'react-dnd';
import { DragItemBlock, DropDirection } from '../components/Selectable.types';

/**
 * If dragging a block A over another block B:
 * get the direction of block A relative to block B.
 */
export const getHoverDirection = (
  dragItem: DragItemBlock,
  monitor: DropTargetMonitor,
  ref: any,
  hoverId: string
): DropDirection => {
  if (!ref.current) return;

  const dragId = dragItem.id;

  // Don't replace items with themselves
  if (dragId === hoverId) return;

  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect();

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

  const verticalSection = hoverBoundingRect.height / 3;
  const topBoundary = hoverMiddleY - verticalSection;
  const bottomBoundary = hoverMiddleY + verticalSection;

  const horizontalSection = hoverBoundingRect.width / 3;
  const leftBoundary = hoverMiddleX + horizontalSection;
  const rightBoundary = hoverMiddleX - horizontalSection;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();
  if (!clientOffset) return;

  // Get pixels to the top
  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  const hoverClientX = hoverBoundingRect.right - (clientOffset as XYCoord).x;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  // if (dragId < hoverId && hoverClientY < hoverMiddleY) {
  if (hoverClientY < topBoundary) {
    return 'top';
  }

  // Dragging upwards
  // if (dragId > hoverId && hoverClientY > hoverMiddleY) {
  if (hoverClientY >= bottomBoundary) {
    return 'bottom';
  }

  if (hoverClientX > leftBoundary) {
    return 'left';
  }

  if (hoverClientX < rightBoundary) {
    return 'right';
  }

  if (hoverClientY > topBoundary && hoverClientY < bottomBoundary) {
    return 'inside';
  }
};
