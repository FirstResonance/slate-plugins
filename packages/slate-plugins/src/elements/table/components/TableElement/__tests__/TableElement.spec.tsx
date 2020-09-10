import React from 'react';
import { act, render } from '@testing-library/react';
import { Element } from 'slate';
import { RenderElementProps } from 'slate-react';
import { TableElement } from '../TableElement';
import { TableResizer } from '../TableResizer';

const attributes = {
  'data-slate-node': 'element',
  ref: React.createRef(),
} as RenderElementProps['attributes'];

jest.mock('slate-react', () => ({
  useEditor: () => Object.create({}),
}));
jest.mock('slate', () => ({
  Editor: { nodes: jest.fn() },
  Transforms: { insertNodes: jest.fn(), setNodes: jest.fn() },
}));
jest.mock('../../../../../common', () => ({
  getNodesById: jest.fn(() => [[[], []]]),
}));

describe('<TableElement />', () => {
  it('should increase height of resizers when number of rows increase', async () => {
    await act(async () => {
      const { container, findAllByTestId } = render(
        <TableElement
          attributes={attributes}
          element={({ id: 100 } as unknown) as Element}
        >
          <tr>
            <td
              data-testid="resizable-col"
              style={{ width: '200px', boxSizing: 'border-box' }}
            >
              <TableResizer
                attributes={attributes}
                element={({ height: 0 } as unknown) as Element}
              >
                <span />
              </TableResizer>
            </td>
            <td style={{ width: '200px', boxSizing: 'border-box' }}>
              <TableResizer
                attributes={attributes}
                element={({ height: 0 } as unknown) as Element}
              >
                <span />
              </TableResizer>
            </td>
          </tr>
          <tr>
            <td
              data-testid="resizable-col"
              style={{ width: '200px', boxSizing: 'border-box' }}
            />
            <td style={{ width: '200px', boxSizing: 'border-box' }} />
          </tr>
        </TableElement>
      );
      const tableBody = container.querySelector('tbody');
      const resizableCol = await findAllByTestId('resizable-col');
      const resizer = resizableCol[0].querySelector(
        '[data-col-resizer="true"]'
      ) as HTMLElement;
      expect(resizer.style.height).toBe('0px');
      tableBody?.insertAdjacentHTML(
        'beforeend',
        `<tr>
<td data-testid='resizable-col' style={{ width: '200px', boxSizing:'border-box' }}></td>
        <td style={{ width: '200px', boxSizing:'border-box' }}></td>
    </tr>`
      );
      tableBody?.insertAdjacentHTML(
        'beforeend',
        `<tr>
<td data-testid='resizable-col' style={{ width: '200px', boxSizing:'border-box' }}></td>
        <td style={{ width: '200px', boxSizing:'border-box' }}></td>
    </tr>`
      );
      expect(resizer.style.width).not.toBe('0px');
    });
  });
});
