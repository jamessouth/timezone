/* eslint-disable no-console */
import removeFirstChunk from './removeFirstChunk';
import splitByRows from './splitByRows';
import stripOutImgTags from './stripOutImgTags';
import removeParens from './removeParens';
import getPlaceNames from './getPlaceNames';
import removeStates from './removeStates';
import removeDuplicateNames from './removeDuplicateNames';
import sortNames from './sortNames';
import replaceUnicodeChars from './replaceUnicodeChars';

const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

export default async function makePipeline(data, seedFunc) {
  await pipeline(data,
    removeFirstChunk,
    splitByRows,
    stripOutImgTags,
    removeParens,
    getPlaceNames,
    removeStates,
    removeDuplicateNames,
    sortNames,
    replaceUnicodeChars,
    seedFunc);
  console.log('Data piped successfully and database seeded!');
}
