import { SlatePlugin } from '@udecode/slate-plugins-core';
import { getRenderElement, setDefaults } from '../../common';
import { TableResizer } from './components/TableElement';

export const RESIZER_TYPE = 'col-resizer';

export const DEFAULTS_RESIZER = {
  resizer: {
    type: RESIZER_TYPE,
    component: TableResizer,
  },
};

export const TableResizerPlugin = (options: any): SlatePlugin => {
  const { resizer } = setDefaults(options, DEFAULTS_RESIZER);
  return {
    renderElement: getRenderElement(resizer),
    voidTypes: [resizer.type],
  };
};
