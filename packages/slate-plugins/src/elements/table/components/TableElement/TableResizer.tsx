import React, { useEffect } from 'react';
import { RenderElementProps } from 'slate-react';

const getStyleVal = (elm: HTMLElement, css: string) => {
  return window.getComputedStyle(elm, null).getPropertyValue(css);
};

const paddingDiff = (col: HTMLElement) => {
  if (getStyleVal(col, 'box-sizing') === 'border-box') {
    return 0;
  }

  const padLeft = getStyleVal(col, 'padding-left');
  const padRight = getStyleVal(col, 'padding-right');
  return parseInt(padLeft, 10) + parseInt(padRight, 10);
};

export const TableResizer = ({
  children,
  attributes,
  element,
}: RenderElementProps) => {
  const style = {
    top: '0',
    right: '-2px',
    position: 'absolute',
    width: '5px',
    cursor: 'col-resize',
    background: 'transparent',
    userSelect: 'none',
    zIndex: 100,
    height: `${element.height}px`,
  };
  const resizerRef = React.useRef<HTMLDivElement>(null);
  const pageX = React.useRef<number | null>(null);
  const curCol = React.useRef<HTMLElement | null>(null);
  const nxtCol = React.useRef<HTMLElement | null>(null);
  const curColWidth = React.useRef<number | null>(null);
  const nxtColWidth = React.useRef<number | null>(null);
  const handleMouseDown = (e: Event) => {
    e.preventDefault();
    curCol.current = resizerRef.current?.parentElement as HTMLElement;
    nxtCol.current = curCol.current?.nextElementSibling as HTMLElement;
    pageX.current = (e as { [key: string]: any }).pageX;
    const padding = paddingDiff(curCol.current);
    curColWidth.current = curCol.current.offsetWidth - (padding || 0);
    if (nxtCol.current) nxtColWidth.current = nxtCol.current.offsetWidth;
  };

  const handleMouseOut = (e: Event) => {
    (e.target as HTMLElement).style.borderRight = '';
  };

  const handleMouseMove = (e: Event) => {
    e.preventDefault();
    if (curCol.current) {
      const diffX =
        (e as { [key: string]: any }).pageX - (pageX.current as number);

      if (nxtCol.current) {
        nxtCol.current.style.width = `${
          (nxtColWidth.current as number) - diffX
        }px`;
      }
      curCol.current.style.width = `${
        (curColWidth.current as number) + diffX
      }px`;
    }
  };

  const handleMouseUp = () => {
    curCol.current = null;
    nxtCol.current = null;
    pageX.current = null;
    nxtColWidth.current = null;
    curColWidth.current = null;
  };
  useEffect(() => {
    if (resizerRef.current) {
      resizerRef.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      resizerRef.current.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('mousemove', handleMouseMove);
    }
  }, [resizerRef]);
  return (
    <div
      data-col-resizer="true"
      {...attributes}
      ref={resizerRef}
      // @ts-ignore
      style={style}
      contentEditable={false}
    >
      {children}
    </div>
  );
};
