const mockTable = `<table><tbody><tr><th>Awards</th></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr></tbody></table>`;

const mockCutTable = `<tr><th>Awards</th></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td></tr>\n<tr><td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>`;

const mockSplitRows = ['<tr><th>Awards</th>', '<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>', '<td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>'];

const mockHeadersRemoved = ['<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span></td>\n<td><b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017</td>\n<td>Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>', '<td>Preceded&#160;by<br /><span><a>Lisa Carrington</a></span></td>\n<td><b> <a>Halberg Awards – Supreme Award</a></b><br/>2017</td>\n<td>Succeeded&#160;by<br /><span><a>Tom Walsh</a></span></td></tr>'];

const mockSplitColumns = ['<td>Preceded&#160;by<br /><span><a>Peter Burling</a> &amp; <a>Blair Tuke</a></span>', '<b> <a>Halberg Awards – New Zealand Team of the Year</a></b><br />2017', 'Succeeded&#160;by<br/><span><a>Black Ferns Sevens</a></span></td>'];

const mockArrays = [
  ['0', '1', '', '3'],
  ['0', '1', '2', ''],
  ['0', '1', '2', '3']
]

export { mockTable, mockCutTable, mockSplitRows, mockHeadersRemoved, mockSplitColumns, mockArrays };
