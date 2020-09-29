import { SelectableStyleProps, SelectableStyles } from './Selectable.types';

const classNames = {
  root: 'slate-Selectable',
  gutterLeft: 'slate-gutter-left',
};

export const getSelectableStyles = ({
  className,
  direction,
  isDragging,
  isDropBlock,
  selected,
}: SelectableStyleProps): SelectableStyles => {
  return {
    root: [
      classNames.root,
      {
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: selected ? 'rgb(181, 215, 255)' : undefined,
        selectors: {
          ':hover .slate-gutter-left': {
            opacity: 1,
          },
        },
      },
      className,
    ],
    block: {
      paddingLeft: '24px',
    },
    blockAndGutter: {
      paddingTop: 3,
      paddingBottom: 3,
    },
    gutterLeft: [
      {
        position: 'absolute',
        top: 0,
        transform: 'translateX(0%)',
        display: 'flex',
        height: '100%',
        opacity: 0,
        maxWidth: '22px',
      },
      classNames.gutterLeft,
    ],
    blockToolbarWrapper: {
      display: 'flex',
      // alignItems: 'center',
      height: '1.5em',
    },
    blockToolbar: {
      width: 18,
      height: 18,
      marginRight: 4,
      pointerEvents: 'auto',
    },
    dragButton: {
      minWidth: 18,
      height: 18,
      padding: 0,
      backgroundColor: 'transparent',
      backgroundRepeat: 'no-repeat',
      border: 'none',
      cursor: 'pointer',
      overflow: 'hidden',
      outline: 'none',
    },
    dragIcon: {
      width: 18,
      height: 18,
      color: 'rgba(55, 53, 47, 0.3)',
    },
    dropLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: direction === 'top' ? -1 : undefined,
      bottom: direction === 'bottom' ? -1 : undefined,
      height: 2,
      opacity: 1,
      background: '#B4D5FF',
      ...(['left', 'right'].includes(direction) && {
        left: direction !== 'right' ? 0 : 'unset',
        top: -1,
        height: '100%',
        width: 2,
      }),
    },
    dropBlock: {
      outline: isDropBlock ? '1px solid #B4D5FF' : undefined,
    },
  };
};
