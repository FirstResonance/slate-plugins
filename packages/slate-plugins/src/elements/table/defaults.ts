import { StyledElement } from '../../components/StyledComponent/StyledElement';
import { TableElement } from './components/TableElement/TableElement';
import { TableKeyOption, TablePluginOptionsValues } from './types';

export const ELEMENT_TABLE = 'table';
export const ELEMENT_TH = 'th';
export const ELEMENT_TR = 'tr';
export const ELEMENT_TD = 'td';

export const DEFAULTS_TABLE: Record<
  TableKeyOption,
  Required<TablePluginOptionsValues> & {
    columnWidths?: string[] | number[];
    id?: string;
  }
> = {
  table: {
    component: TableElement,
    type: ELEMENT_TABLE,
    columnWidths: [],
    rootProps: {
      className: 'slate-table',
      as: 'table',
    },
  },
  tr: {
    component: StyledElement,
    type: ELEMENT_TR,
    rootProps: {
      className: 'slate-tr',
      as: 'tr',
    },
  },
  th: {
    component: StyledElement,
    type: ELEMENT_TH,
    rootProps: {
      className: 'slate-th',
      as: 'th',
      styles: {
        root: {
          backgroundColor: 'rgb(244, 245, 247)',
          border: '1px solid rgb(193, 199, 208)',
          minWidth: '48px',
          textAlign: 'left',
          padding: '8px',
          position: 'relative',
          selectors: {
            '> *': {
              margin: 0,
            },
          },
        },
      },
    },
  },
  td: {
    component: StyledElement,
    type: ELEMENT_TD,
    rootProps: {
      className: 'slate-td',
      as: 'td',
      styles: {
        root: {
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(193, 199, 208)',
          minWidth: '48px',
          padding: '8px',
          position: 'relative',
          selectors: {
            '> *': {
              margin: 0,
            },
          },
        },
      },
    },
  },
};
