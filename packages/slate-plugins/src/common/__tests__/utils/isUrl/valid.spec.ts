import { isUrl } from '../../../utils/index';

const input = 'http://localhost';

const output = true;

it('should be', () => {
  expect(isUrl(input)).toEqual(output);
});