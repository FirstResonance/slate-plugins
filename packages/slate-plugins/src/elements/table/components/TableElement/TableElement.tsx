import * as React from 'react';
import { classNamesFunction, styled } from '@uifabric/utilities';
import { Transforms } from 'slate';
import { useEditor } from 'slate-react';
import { RESIZER_TYPE } from '../..';
import { getNodesById } from '../../../../common';
import {
  TableElementProps,
  TableElementStyleProps,
  TableElementStyles,
} from '../../types';
import { getTableElementStyles } from './TableElement.styles';

const getClassNames = classNamesFunction<
  TableElementStyleProps,
  TableElementStyles
>();

/**
 * TableElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TableElementBase = ({
  attributes,
  children,
  className,
  element,
  styles,
}: TableElementProps) => {
  const classNames = getClassNames(styles, {
    className,
    // Other style props
  });
  const tableRef = React.useRef<HTMLTableElement>(null);
  const { id } = element;
  const editor = useEditor();
  const [mutation, setMutation] = React.useState<MutationRecord | null>(null);

  React.useEffect(() => {
    const nodes = getNodesById(editor, id as string);
    if (nodes && nodes.length > 0) {
      const tablePath = nodes[0][1];
      const firstRowPath = [...tablePath, 0];
      const colResizer = {
        type: RESIZER_TYPE,
        height: tableRef.current?.offsetHeight,
        children: [{ text: ' ' }],
      };
      const row = tableRef.current?.getElementsByTagName('tr')[0];
      const cols = row ? ((row.children as unknown) as HTMLElement[]) : null;
      if (cols && cols.length > 0) {
        for (let i = 0; i < cols.length; i++) {
          const tableNode = nodes[0][0];
          if (
            tableNode.columnWidths &&
            (tableNode.columnWidths as string[]).length > 0
          ) {
            cols[i].style.width =
              (tableNode.columnWidths as string[])[i] || 'auto';
          }
          if (cols[i].querySelector('[data-col-resizer="true"]')) {
            Transforms.setNodes(
              editor,
              { height: tableRef.current?.offsetHeight },
              { at: [...firstRowPath, i, 0] }
            );
            continue;
          }
          Transforms.insertNodes(editor, colResizer, {
            at: [...firstRowPath, i, 0],
          });
        }
      }
    }
  }, [tableRef, mutation, editor, id]);

  const callback = React.useCallback(
    (mutationsList: MutationRecord[]) => {
      for (const mutationRecord of mutationsList) {
        if (
          mutationRecord.type === 'childList' ||
          mutationRecord.type === 'attributes'
        ) {
          setMutation(mutationRecord);
        }
      }
    },
    [setMutation]
  );
  const observer = React.useMemo(
    () => window.MutationObserver && new MutationObserver(callback),
    [callback]
  );
  const config = React.useMemo(
    () => ({ childList: true, subtree: true, attributes: true }),
    []
  );
  React.useEffect(() => {
    if (!tableRef.current) return;
    observer?.observe(tableRef.current as HTMLTableElement, config);
  }, [observer, config]);
  const saveColumnWidths = React.useCallback(() => {
    const nodes = getNodesById(editor, id as string);
    if (nodes && nodes.length > 0) {
      const tablePath = nodes[0][1];
      const row = tableRef.current?.getElementsByTagName('tr')[0];
      const cols = row ? ((row.children as unknown) as HTMLElement[]) : null;
      if (cols && cols.length > 0) {
        const columnWidths: string[] = [];
        for (let i = 0; i < cols.length; i++) {
          columnWidths[i] = cols[i].style.width;
        }
        Transforms.setNodes(editor, { columnWidths }, { at: tablePath });
      }
    }
  }, [editor, id]);
  React.useEffect(() => {
    if (!tableRef.current) return;
    tableRef.current.addEventListener('blur', saveColumnWidths);
  }, [tableRef, saveColumnWidths]);
  return (
    <table
      {...attributes}
      ref={tableRef}
      id={element.id as string}
      style={{ position: 'relative' }}
      className={classNames.root}
    >
      <tbody>{children}</tbody>
    </table>
  );
};

/**
 * TableElement
 */
export const TableElement = styled<
  TableElementProps,
  TableElementStyleProps,
  TableElementStyles
>(TableElementBase, getTableElementStyles, undefined, {
  scope: 'TableElement',
});
