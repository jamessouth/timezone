import React, { useState, useEffect, useRef } from 'react';


export default function Form({ offsetList, postQuery }) {
  const code1 = useRef('');
  const [queryText, setQueryText] = useState(null);
  const [selectValue, setSelectValue] = useState('Select...');
  const [radioValue, setRadioValue] = useState(null);

  useEffect(() => {
    setQueryText(code1.current.textContent);
  }, [radioValue, selectValue]);

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

      <label htmlFor="huey">huey</label>
      <input onChange={e => setRadioValue(e.target.value)} type="radio" id="huey" name="drone" value="huey"/>

      <label htmlFor="dewey">Dewey</label>
      <input onChange={e => setRadioValue(e.target.value)} type="radio" id="dewey" name="drone" value="dewey"/>


      {
        radioValue === 'huey' &&
          <div className="div">
            <pre className="pre">
              <code ref={code1} className="code">{`
{
  timezone(offset: "${selectValue}") {
    places
  }
}
              `}</code>
            </pre>
          </div>
      }


      <button type="button" onClick={() => postQuery(queryText)}>submit query</button>
    </form>
  );

}



      // <textarea readOnly value={queryText} onChange={e => setQueryText(e.target.value)} cols="40" rows="15" name="query"></textarea>
