import React, { useState, useEffect, useRef } from 'react';
import { h2, button, checkdiv, selectdiv, p, p2 } from '../styles/Form.module.css';

export default function Form({ offsetList, placeList, postQuery }) {
  offsetList = [];
  placeList = [];



  const code1 = useRef('');
  const [queryText, setQueryText] = useState(null);
  const [selectTimezoneValue, setSelectTimezoneValue] = useState('UTC+/-...');
  const [selectPlaceValue, setSelectPlaceValue] = useState('Place...');
  // const [radioValue, setRadioValue] = useState(null);
  const [offsetCheckboxValue, setOffsetCheckboxValue] = useState(false);
  const [placeCheckboxValue, setPlaceCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState(null);
  const [nameCheckboxValue, setNameCheckboxValue] = useState(false);
  const [flagCheckboxValue, setFlagCheckboxValue] = useState(false);

  useEffect(() => {
    setQueryText(code1.current.textContent);
  }, [
    // radioValue,
    selectTimezoneValue,
    offsetCheckboxValue,
    nameCheckboxValue,
    flagCheckboxValue,
  ]);

  // [h2, 'font-effect-decaying'].join(' ')

  return (
    <section>
      <h2 className={ h2 }>Construct GraphQL Query</h2>
      <form>

        <fieldset>
          <legend>&nbsp;&nbsp;Select query:&nbsp;&nbsp;</legend>

          <label htmlFor="timezone">Time Zone</label>
          <input onChange={e => setRadioValue(e.target.value)} type="radio" id="timezone" name="queryType" value="timezone"/>

          <label htmlFor="place">Place</label>
          <input onChange={e => setRadioValue(e.target.value)} type="radio" id="place" name="queryType" value="place"/>

        </fieldset>

        <fieldset>
          <legend>&nbsp;&nbsp;Select input:&nbsp;&nbsp;</legend>
          <div className={ selectdiv }>
            <label htmlFor="offsetSelectList">Select offset:</label>
            <select
            value={ selectTimezoneValue }
            onChange={e => setSelectTimezoneValue(e.target.value)}
            id="offsetSelectList"
            >
              <option hidden>{ selectTimezoneValue }</option>
              {offsetList.map(({ offset }, i) => <option key={ i } value={ offset }>{ offset }</option>)}
            </select>
          </div>

          <div className={ selectdiv }>
            <label htmlFor="placeSelectList">Select place:</label>
            <select
            value={ selectPlaceValue }
            onChange={e => setSelectPlaceValue(e.target.value)}
            id="placeSelectList"
            >
              <option hidden>{ selectPlaceValue }</option>
              {placeList.map(({ place }, i) => <option key={ i } value={ place }>{ place }</option>)}
            </select>
          </div>
        </fieldset>



        <fieldset>
          <legend>&nbsp;&nbsp;Select data:&nbsp;&nbsp;</legend>

          <div className={ checkdiv }>
            <label htmlFor="offset1">offset<input onChange={() => setOffsetCheckboxValue(val => !val)} type="checkbox" id="offset1" name="fields" value={ offsetCheckboxValue }/></label>

            <p className={ [p, p2].join(" ") }>places:</p>

            <label htmlFor="name">&#8735;name<input onChange={() => setNameCheckboxValue(val => !val)} type="checkbox" id="name" name="fields" value={ nameCheckboxValue }/></label>

            <label htmlFor="flag">&#8735;&nbsp;&nbsp;flag<input onChange={() => setFlagCheckboxValue(val => !val)} type="checkbox" id="flag" name="fields" { ...( !nameCheckboxValue ? { 'disabled': true } : {}) } value={ flagCheckboxValue }/></label>
          </div>


          <div className={ checkdiv }>
            <label htmlFor="place1">place<input onChange={() => setPlaceCheckboxValue(val => !val)} type="checkbox" id="place1" name="fields" value={ placeCheckboxValue }/></label>



            <label htmlFor="offset2">offsets<input onChange={() => setOffsetCheckboxValue(val => !val)} type="checkbox" id="offset2" name="fields" value={ offsetCheckboxValue }/></label>


          </div>
        </fieldset>
      </form>

  <p className={ p }>Your query:</p>
    <pre>
                    <code ref={ code1 }>{`{
  timezone(offset: "${selectTimezoneValue}") {
    ${offsetCheckboxValue ? 'offset' : ''}
    ${nameCheckboxValue ? `places {
      name
      ${flagCheckboxValue ? 'flag' : ''}
    }` : ''}
  }
}`}</code>
    </pre>

      <button
        type="button"
        className={ button }
        style={{ maxWidth: 300 }}
        onClick={() => postQuery(queryText)}
        { ...(selectTimezoneValue == 'UTC+/-...' || !queryText || (!offsetCheckboxValue && !nameCheckboxValue) ? { 'disabled': true } : {}) }
      >
        submit query
      </button>

    </section>
  );

}
