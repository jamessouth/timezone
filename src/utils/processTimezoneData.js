import getTimezoneData from './getTimezoneData';
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
// import addFirstIndex from './addFirstIndex';
import pipe from './pipe';

export default async function processTimezoneData() {
  const data = await getTimezoneData();

  return [
    cutOutTable,
    splitIntoRows,
    removeColumnHeaders,
  ]
    .reduce((res, nextFn) => nextFn(res), data)
    .map(pipe(
      splitIntoColumns,
      removeUnneededColumns,
      getOffset,
      filterOutParens,
      filterPlaceNames,
      extractPlaceNames,
      removeMissedStateNames,
      abbrevLongNames,
      sortNames,
      deDupe,
      // makeOptions,
    ));
    // .reduce((acc, nextArr) => [...acc, ...nextArr]));
}
