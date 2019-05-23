import { describe } from 'riteway';// , Try
import { myTable, myCutTable } from './testHelpers';
import cutOutTable from './cutOutTable';

describe('cutOutTable cuts rows out of the body of a table', async assert => {

  assert({
    given: 'a table as a string',
    should: 'cut the rows out',
    actual: cutOutTable(myTable),
    expected: myCutTable
  });

});
