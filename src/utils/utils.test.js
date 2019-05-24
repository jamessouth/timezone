import { describe } from 'riteway';// , Try
import { mockTable, mockCutTable, mockSplitRows, mockHeadersRemoved, mockSplitColumns, mockArrays, mockTableRowArray, mockTableRowArray2, filteredNodes, missedStates, longNames, dupes } from './testHelpers';
import cutOutTable from './cutOutTable';
import splitIntoRows from './splitIntoRows';
import removeColumnHeaders from './removeColumnHeaders';
import splitIntoColumns from './splitIntoColumns';
import removeUnneededColumns from './removeUnneededColumns';
import getOffset from './getOffset';
import filterOutParens from './filterOutParens';
import filterPlaceNames from './filterPlaceNames';
import extractPlaceNames from './extractPlaceNames';
import removeMissedStateNames from './removeMissedStateNames';
import abbrevLongNames from './abbrevLongNames';
import sortNames from './sortNames';
import deDupe from './deDupe';
import addFirstIndex from './addFirstIndex';

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

describe('getOffset strips text content out of HTML', async assert => {
  assert({
    given: 'an array of HTML strings',
    should: 'return a new array: [text of the first element, the rest of the array]',
    actual: getOffset(mockTableRowArray),
    expected: ['UTC+14:00', mockTableRowArray[1]]
  });
});

describe('filterOutParens strips out parenthesized text', async assert => {
  assert({
    given: 'an array of HTML strings',
    should: 'return a new array: [the first element, second element minus parens]',
    actual: filterOutParens(mockTableRowArray),
    expected: ['\n<td><a href="/wiki/UTC%2B14:00" title="UTC+14:00">UTC+14:00</a>\n', 'mock']
  });
});

describe('filterPlaceNames strips out HTML that isn\'t an <a> or <p> tag', async assert => {
  assert({
    given: 'an array of strings, the 2nd element being HTML',
    should: 'return a new array: [the first element as is, second element an AST with only <a> and <p> nodes]',// ASTs not comparing well so making a simple mapping
    actual: [filterPlaceNames(mockTableRowArray2)[0], filterPlaceNames(mockTableRowArray2)[1].map(e => e.nodeName)],
    expected: ['m', filteredNodes.map(e => e.nodeName)]
  });
});

describe('extractPlaceNames pulls text from HTML nodes', async assert => {
  assert({
    given: 'an array with a string and an AST',
    should: 'return a new array: [the first element as is, then a spread out array of place names]',
    actual: extractPlaceNames(['j', filteredNodes]),
    expected: ['j', 'Bangladesh', 'Bhutan', 'British Indian Ocean Territory']
  });
});

describe('removeMissedStateNames removes state names not previously stripped by filterOutParens', async assert => {
  assert({
    given: 'an array with a state name',
    should: 'return a new array with the state removed',
    actual: removeMissedStateNames(missedStates[0]),
    expected: ['UTC−04:00', 1, 2, 3, 4]
  });
  assert({
    given: 'an array',
    should: 'return a new array with the 5 elements from index 8 on removed',// several states removed
    actual: removeMissedStateNames(missedStates[1]),
    expected: ['UTC−03:00', 1, 2, 3, 4, 5, 6, 7, 13, 14, 15]
  });
  assert({
    given: 'an array with a state name',
    should: 'return a new array with the state removed',
    actual: removeMissedStateNames(missedStates[2]),
    expected: ['UTC+10:00', 1, 2, 3, 4]
  });
});

describe('abbrevLongNames shortens long names', async assert => {
  assert({
    given: 'an array of strings',
    should: 'return a new array with a few select long names shortened',
    actual: abbrevLongNames(longNames),
    expected: ['n', 'S Georgia/S Sandwich Islands', 'BIOT', 'DR Congo']
  });
});

describe('sortNames sorts names in alpha order', async assert => {
  assert({
    given: 'an array of strings',
    should: 'return a new array with indices 1+ alpha sorted',
    actual: sortNames(longNames),
    expected: ['n', 'British Indian Ocean Territory', 'Democratic Republic of the Congo', 'South Georgia and the South Sandwich Islands']
  });
});

describe('deDupe removes duplicate names', async assert => {
  assert({
    given: 'an array of strings',
    should: 'return a new array with any duplicate elements removed',
    actual: deDupe(dupes),
    expected: ['n', 'p', 'b', '2', 'x']
  });
});

describe('addFirstIndex tacks the first index of an array onto the front of every other element in the array', async assert => {
  assert({
    given: 'an array of strings',
    should: 'return a new array with the former first element now at the front of every other element',
    actual: addFirstIndex(dupes),
    expected: ['n\u00A0\u00A0p', 'n\u00A0\u00A0b', 'n\u00A0\u00A0b', 'n\u00A0\u00A0n', 'n\u00A0\u00A02', 'n\u00A0\u00A0x', 'n\u00A0\u00A0x']
  });
});
