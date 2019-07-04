import React, { useState, useEffect } from 'react';

export default function Form({ offsetList, postQuery }) {
  const [queryText, updateQueryText] = useState('');
  const [selectValue, setSelectValue] = useState('Select...');

  return (
    <form>
      {
        offsetList &&
          <select
            value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            id="sort"
          >
            <option hidden>Select...</option>
            {offsetList.map(({ offset }, i) => <option key={i} value={offset}>{offset}</option>)}
          </select>
      }




      <textarea value={queryText} onChange={e => updateQueryText(e.target.value)} cols="40" rows="15" placeholder="{query...}" name="query"></textarea>
      {
        queryText.length > 0 && <button type="button" onClick={() => props.postQuery(queryText)}>submit query</button>
      }
    </form>
  );

}
