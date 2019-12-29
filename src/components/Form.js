import React, { useState, useEffect, useRef } from 'react';
import { h2, button, check, checkdiv, checkdiv2, form, radiodiv, selectdiv, p, p2 } from '../styles/Form.module.css';

export default function Form({ offsetList, placeList, postQuery }) {
  offsetList = [];
  placeList = [];



  const code1 = useRef('');
  const [radioValue, setRadioValue] = useState(null);
  const [selectTimezoneValue, setSelectTimezoneValue] = useState('UTC+/-...');
  const [selectPlaceValue, setSelectPlaceValue] = useState('Place...');
  const [offsetTZCheckboxValue, setOffsetTZCheckboxValue] = useState(false);
  const [nameTZCheckboxValue, setNameTZCheckboxValue] = useState(false);
  const [flagCheckboxValue, setFlagCheckboxValue] = useState(false);
  const [namePLCheckboxValue, setNamePLCheckboxValue] = useState(false);
  const [offsetPLCheckboxValue, setOffsetPLCheckboxValue] = useState(false);
  const [queryText, setQueryText] = useState(null);

  useEffect(() => {
    setQueryText(code1.current.textContent);
  }, [
    radioValue,
    selectTimezoneValue,
    selectPlaceValue,
    offsetTZCheckboxValue,
    nameTZCheckboxValue,
    flagCheckboxValue,
    namePLCheckboxValue,
    offsetPLCheckboxValue,
  ]);

  // [h2, 'font-effect-decaying'].join(' ')

  return (
    <section>
      <h2 className={ h2 }>Construct GraphQL Query</h2>
      <form className={ radioValue ? form : '' }>

        <fieldset>
          <legend>&nbsp;&nbsp;Select query:&nbsp;&nbsp;</legend>
          <div className={ radiodiv }>
            <label>
              Time Zone
              <input
                onChange={
                  e => {
                    setRadioValue(e.target.value);
                    setNamePLCheckboxValue(false);
                    setOffsetPLCheckboxValue(false);
                  }
                }
                type="radio"
                name="queryType"
                value="timezone"
              />
            </label>

            <label>
              Place
              <input
                onChange={
                  e => {
                    setRadioValue(e.target.value);
                    setOffsetTZCheckboxValue(false);
                    setNameTZCheckboxValue(false);
                    setFlagCheckboxValue(false);
                  }
                }
                type="radio"
                name="queryType"
                value="place"
              />
            </label>
          </div>
        </fieldset>

        {
          radioValue &&
            <fieldset>
              <legend>&nbsp;&nbsp;Select input:&nbsp;&nbsp;</legend>
              {
                radioValue == "timezone" &&
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
              }

              {
                radioValue == "place" &&
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
              }
            </fieldset>
        }

        {
          radioValue &&
            <fieldset>
              <legend>&nbsp;&nbsp;Select data:&nbsp;&nbsp;</legend>

              {
                radioValue == "timezone" &&
                  <div className={ [check, checkdiv].join(' ') }>
                    <label htmlFor="offset1">offset<input onChange={() => setOffsetTZCheckboxValue(val => !val)} type="checkbox" id="offset1" name="fields" value={ offsetTZCheckboxValue }/></label>

                    <p className={ [p, p2].join(" ") }>places:</p>

                    <label htmlFor="name">&#8735;name<input onChange={() => setNameTZCheckboxValue(val => !val)} type="checkbox" id="name" name="fields" value={ nameTZCheckboxValue }/></label>

                    <label htmlFor="flag">&#8735;&nbsp;&nbsp;flag<input onChange={() => setFlagCheckboxValue(val => !val)} type="checkbox" id="flag" name="fields" { ...( !nameTZCheckboxValue ? { 'disabled': true } : {}) } value={ flagCheckboxValue }/></label>
                  </div>
              }

              {
                radioValue == "place" &&
                  <div className={ [check, checkdiv2].join(' ') }>
                    <label htmlFor="place1">name<input onChange={() => setNamePLCheckboxValue(val => !val)} type="checkbox" id="place1" name="fields" value={ namePLCheckboxValue }/></label>

                    <label htmlFor="offset2">offsets<input onChange={() => setOffsetPLCheckboxValue(val => !val)} type="checkbox" id="offset2" name="fields" value={ offsetPLCheckboxValue }/></label>


                  </div>
              }
            </fieldset>
        }


      </form>

{
  radioValue &&
<>
  <p className={ p }>Your query:{queryText}</p>
{
  radioValue == "timezone" &&
    <pre>
                    <code ref={ code1 }>{`{
  timezone(offset: "${selectTimezoneValue}") {
    ${offsetTZCheckboxValue ? 'offset' : ''}
    ${nameTZCheckboxValue ? `places {
      name
      ${flagCheckboxValue ? 'flag' : ''}
    }` : ''}
  }
}`}</code>
    </pre>
}

{
  radioValue == "place" &&
    <pre>
                    <code ref={ code1 }>{`{
  place(name: "${selectPlaceValue}") {
    ${namePLCheckboxValue ? 'name' : ''}
    ${offsetPLCheckboxValue ? 'offsets' : ''}
  }
}`}</code>
    </pre>
}


      <button
        type="button"
        className={ button }
        style={{ maxWidth: 300 }}
        onClick={() => postQuery(queryText)}
        { ...(selectTimezoneValue == 'UTC+/-...' || !queryText || (!offsetTZCheckboxValue && !nameTZCheckboxValue) ? { 'disabled': true } : {}) }
      >
        submit query
      </button>
    </>
}
    </section>
  );

}
