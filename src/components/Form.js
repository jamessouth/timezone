import React, { useState, useEffect, useRef } from 'react';
import { h2, checkdiv, selectdiv, p } from '../styles/Form.module.css';
import { button } from '../styles/index.css';

export default function Form({ offsetList, postQuery }) {
  const code1 = useRef('');
  const [queryText, setQueryText] = useState(null);
  const [selectValue, setSelectValue] = useState('UTC+/-...');
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

  // [h2, 'font-effect-decaying'].join(' ')

  return (
    <section>
      <h2 className={ h2 }>Construct GraphQL Query</h2>
      <form>

        <fieldset>
          <div className={ selectdiv }>
            <label htmlFor="offsets">Select offset:</label>
            <select
            value={ selectValue }
            onChange={e => setSelectValue(e.target.value)}
            id="offsets"
            >
              <option hidden>{ selectValue }</option>
              {offsetList.map(({ offset }, i) => <option key={ i } value={ offset }>{ offset }</option>)}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Select data:</legend>

          <div className={ checkdiv }>
            <label htmlFor="offset">offset<input onChange={() => setOffsetCheckboxValue(val => !val)} type="checkbox" id="offset" name="fields" value={ offsetCheckboxValue }/></label>

            <label htmlFor="places">places<input onChange={() => setPlacesCheckboxValue(val => !val)} type="checkbox" id="places" name="fields" value={ placesCheckboxValue }/></label>
          </div>
        </fieldset>
      </form>

  <p className={ p }>Your query:</p>
    <pre>
                    <code ref={ code1 }>{`{
  timezone(offset: "${selectValue}") {
    ${offsetCheckboxValue ? 'offset' : ''}
    ${placesCheckboxValue ? 'places' : ''}
  }
}`}</code>
    </pre>

      <button
        type="button"
        className={ button }
        style={{ maxWidth: 300 }}
        onClick={() => postQuery(queryText)}
        { ...(selectValue == 'UTC+/-...' || !queryText || (!offsetCheckboxValue && !placesCheckboxValue) ? { 'disabled': true } : {}) }
      >
        submit query
      </button>

    </section>
  );

}

// <div ></div>

// <div className={ div }></div>
// <label htmlFor="dewey">Dewey</label>
// <input onChange={e => setRadioValue(e.target.value)} type="radio" id="dewey" name="drone" value="dewey"/>

      // <textarea readOnly value={queryText} onChange={e => setQueryText(e.target.value)} cols="40" rows="15" name="query"></textarea>

      // <label htmlFor="huey">huey</label>
      // <input onChange={e => setRadioValue(e.target.value)} type="radio" id="huey" name="drone" value="huey"/>
