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

const { pipeline } = require('stream');

export default function makePipeline(data, seedFunc) {
  return pipeline(data,
    removeFirstChunk,
    splitByRows,
    stripOutImgTags,
    removeParens,
    getPlaceNames,
    removeStates,
    removeDuplicateNames,
    sortNames,
    replaceUnicodeChars,
    seedFunc,
    err => err ? console.log(err) : console.log('Data successfully piped!'));
}
