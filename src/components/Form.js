import React, { useState, useEffect, useRef } from 'react';
import { div, pre, select, checkdiv, button, fieldset } from '../styles/Form.module.css';

export default function Form({ offsetList, postQuery }) {
  const code1 = useRef('');
  const [queryText, setQueryText] = useState(null);
  const [selectValue, setSelectValue] = useState('Select...');
  // const [radioValue, setRadioValue] = useState(null);
  const [offsetCheckboxValue, setOffsetCheckboxValue] = useState(false);
  const [placesCheckboxValue, setPlacesCheckboxValue] = useState(false);

  useEffect(() => {
    setQueryText(code1.current.textContent);
  }, [
    // radioValue,
    selectValue,
    offsetCheckboxValue,
    placesCheckboxValue,
  ]);

  return (
    <form>
      <fieldset className={ fieldset }>
        <legend>Construct GraphQL Query</legend>
        <div className={ div }>
          <select
            value={selectValue}
            className={ select }
            onChange={e => setSelectValue(e.target.value)}
            id="sort"
          >
            <option hidden>Select...</option>
            {offsetList.map(({ offset }, i) => <option key={i} value={offset}>{offset}</option>)}
          </select>

          <div className={ checkdiv }>
            <label htmlFor="offset">offset<input onChange={() => setOffsetCheckboxValue(val => !val)} type="checkbox" id="offset" name="fields" value={offsetCheckboxValue}/></label>

            <label htmlFor="places">places<input onChange={() => setPlacesCheckboxValue(val => !val)} type="checkbox" id="places" name="fields" value={placesCheckboxValue}/></label>
          </div>

  <pre className={ pre }>
                  <code ref={ code1 } className="code">{`{
  timezone(offset: "${selectValue}") {
    ${offsetCheckboxValue ? 'offset' : ''}
    ${placesCheckboxValue ? 'places' : ''}
  }
}`}</code>
  </pre>

              <button
                type="button"
                className={ button }
                onClick={() => postQuery(queryText)}
                { ...(selectValue == 'Select...' || !queryText || (!offsetCheckboxValue && !placesCheckboxValue) ? { 'disabled': true } : {}) }
              >
                submit query
              </button>

        </div>
      </fieldset>
    </form>
  );

}

// <div ></div>


// <label htmlFor="dewey">Dewey</label>
// <input onChange={e => setRadioValue(e.target.value)} type="radio" id="dewey" name="drone" value="dewey"/>

      // <textarea readOnly value={queryText} onChange={e => setQueryText(e.target.value)} cols="40" rows="15" name="query"></textarea>

      // <label htmlFor="huey">huey</label>
      // <input onChange={e => setRadioValue(e.target.value)} type="radio" id="huey" name="drone" value="huey"/>
