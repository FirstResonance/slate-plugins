// @ts-ignore
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Element } from 'slate';
import { RenderElementProps } from 'slate-react';
import { TableResizer } from '../TableResizer';
import { getMouseEvent } from './FakeMouseEvent';

const attributes = {
  'data-slate-node': 'element',
  ref: React.createRef(),
} as RenderElementProps['attributes'];
describe('<TableResizer />', () => {
  it('should resize columns', async () => {
    const { findByTestId } = render(
      <table>
        <tbody>
          <tr>
            <td
              data-testid="resizable-col"
              style={{ width: '200px', boxSizing: 'border-box' }}
            >
              <TableResizer
                attributes={attributes}
                element={({ height: 200 } as unknown) as Element}
              >
                <span />
              </TableResizer>
            </td>
            <td style={{ width: '200px', boxSizing: 'border-box' }} />
          </tr>
          <tr>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    );

    let resizableCol = await findByTestId('resizable-col');
    const resizer = resizableCol.querySelector(
      '[data-col-resizer="true"]'
    ) as HTMLElement;
    expect(resizableCol.style.width).toBe('200px');
    expect((resizableCol.nextElementSibling as HTMLElement).style.width).toBe(
      '200px'
    );
    fireEvent(resizer, getMouseEvent('mousedown', { pageX: 10 }));
    fireEvent(document, getMouseEvent('mousemove', { pageX: 1000 }));
    resizableCol = await findByTestId('resizable-col');
    expect(resizableCol.style.width).toBe('990px');
  });
});
