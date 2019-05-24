const mockTable = `<table><tbody><tr><th>Awards</th></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr></tbody></table>`;

const mockCutTable = `<tr><th>Awards</th></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>`;

const mockSplitRows = ['<tr><th>Awards</th>', '<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>', '<td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>'];

const mockHeadersRemoved = ['<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>', '<td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>'];

const mockSplitColumns = ['<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span>', '<b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017', 'Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>'];

const mockArrays = [
  ['0', '1', '', '3'],
  ['0', '1', '2', ''],
  ['0', '1', '2', '3']
];

const mockTableRowArray = [
  `\n<td><a href="/wiki/UTC%2B14:00" title="UTC+14:00">UTC+14:00</a>\n`,
  `mock(mock)`
];

const mockTableRowArray2 = [
  'm',
  `<span class="flagicon"><img alt="" decoding="async" width="23" height="14" class="thumbborder" data-file-width="1000" data-file-height="600" />&#160;</span><a href="/wiki/Bangladesh" title="Bangladesh">Bangladesh</a><span class="flagicon"><a href="/wiki/Bhutan" title="Bhutan"><img alt="Bhutan" decoding="async" width="23" height="15" class="thumbborder" data-file-width="900" data-file-height="600" /></a></span> <a href="/wiki/Bhutan" title="Bhutan">Bhutan</a><p><span class="flagicon"><a href="/wiki/British_Indian_Ocean_Territory" title="British Indian Ocean Territory"><img alt="British Indian Ocean Territory" decoding="async" width="23" height="12" class="thumbborder" data-file-width="600" data-file-height="300" /></a></span> <a href="/wiki/British_Indian_Ocean_Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</a></p>`
];
/* eslint-disable quotes */
const filteredNodes = [
  {"nodeName":"a","tagName":"a","attrs":[{"name":"href","value":"/wiki/Bangladesh"},{"name":"title","value":"Bangladesh"}],"namespaceURI":"http://www.w3.org/1999/xhtml","childNodes":[{"nodeName":"#text","value":"Bangladesh","parentNode":[null]}],"parentNode":{"nodeName":"#document-fragment","childNodes":[[null],[null],[null],[null],[null],[null]]}},
  {"nodeName":"a","tagName":"a","attrs":[{"name":"href","value":"/wiki/Bhutan"},{"name":"title","value":"Bhutan"}],"namespaceURI":"http://www.w3.org/1999/xhtml","childNodes":[{"nodeName":"#text","value":"Bhutan","parentNode":[null]}],"parentNode":{"nodeName":"#document-fragment","childNodes":[[null],[null],[null],[null],[null],[null]]}},
  {"nodeName":"p","tagName":"p","attrs":[],"namespaceURI":"http://www.w3.org/1999/xhtml","childNodes":[{"nodeName":"span","tagName":"span","attrs":[null],"namespaceURI":"http://www.w3.org/1999/xhtml","childNodes":[null],"parentNode":[null]},{"nodeName":"#text","value":" ","parentNode":[null]},{"nodeName":"a","tagName":"a","attrs":[null],"namespaceURI":"http://www.w3.org/1999/xhtml","childNodes":[{"nodeName":"#text","value":"British Indian Ocean Territory","parentNode":[null]}],"parentNode":[null]}],"parentNode":{"nodeName":"#document-fragment","childNodes":[[null],[null],[null],[null],[null],[null]]}}
];
/* eslint-enable quotes */

const missedStates = [
  ['UTC−04:00', 1, 2, 'Mato Grosso do Sul', 3, 4],
  ['UTC−03:00', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  ['UTC+10:00', 1, 2, 'Victoria', 3, 4]
];


export { mockTable, mockCutTable, mockSplitRows, mockHeadersRemoved, mockSplitColumns, mockArrays, mockTableRowArray, mockTableRowArray2, filteredNodes, missedStates };
