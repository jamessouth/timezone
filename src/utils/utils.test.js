import { describe } from 'riteway';// , Try
import { mockTable, mockCutTable, mockSplitRows, mockHeadersRemoved, mockSplitColumns, mockArrays } from './testHelpers';
import cutOutTable from './cutOutTable';
import splitIntoRows from './splitIntoRows';
import removeColumnHeaders from './removeColumnHeaders';
import splitIntoColumns from './splitIntoColumns';
import removeUnneededColumns from './removeUnneededColumns';

describe('cutOutTable cuts rows out of the body of a table', async assert => {
  assert({
    given: 'a table as a string',
    should: 'remove table and tbody tags, leaving the rows',
    actual: cutOutTable(mockTable),
    expected: mockCutTable
  });
});

describe('splitIntoRows splits string into array of table cells', async assert => {
  assert({
    given: 'a string of <tr>s',
    should: 'return array of individual table cells',
    actual: splitIntoRows(mockCutTable),
    expected: mockSplitRows
  });
});

describe('removeColumnHeaders removes the first element of an array', async assert => {
  assert({
    given: 'an array',
    should: 'return all but the first element',
    actual: removeColumnHeaders(mockSplitRows),
    expected: mockHeadersRemoved
  });
});

describe('splitIntoColumns splits rows into data cells', async assert => {
  assert({
    given: 'a string of <td>s',
    should: 'return an array of table data',
    actual: splitIntoColumns(mockHeadersRemoved[0]),
    expected: mockSplitColumns
  });
});

describe('removeUnneededColumns removes 1st index from array and any empty strings', async assert => {
  assert({
    given: 'an array with empty string at 2nd index',
    should: 'return an array with 0th and 3rd indices',
    actual: removeUnneededColumns(mockArrays[0]),
    expected: ['0', '3']
  });
  assert({
    given: 'an array with empty string at 3rd index',
    should: 'return an array with 0th and 2nd indices',
    actual: removeUnneededColumns(mockArrays[1]),
    expected: ['0', '2']
  });
  assert({
    given: 'an array with 4 elements',
    should: 'return an array with 0th at 0, then 2nd and 3rd indices together at 1',
    actual: removeUnneededColumns(mockArrays[2]),
    expected: ['0', '2,3']
  });
});
