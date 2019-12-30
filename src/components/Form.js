import React, { useState, useEffect, useRef } from 'react';
import Radio from './Radio';
import Select from './Select';
import {
  button,
  check,
  checkdiv,
  checkdiv2,
  form,
  h2,
  p,
  p2,
  radiodiv,
  selectdiv
} from '../styles/Form.module.css';

export default function Form({ offsetList, placeList, postQuery }) {
  offsetList = [{offset:'UTC-2'}, {offset:'UTC+9'}];
  placeList = [{place:'texas'},{place:'ohio'}];



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
  const [disableSendBtn, setDisableSendBtn] = useState(true);



  function handleRadioChange(val) {
    setRadioValue(val);
    if (val == 'timezone') {
      setNamePLCheckboxValue(false);
      setOffsetPLCheckboxValue(false);
    } else {
      setOffsetTZCheckboxValue(false);
      setNameTZCheckboxValue(false);
      setFlagCheckboxValue(false);
    }
  }

  function handleSelectChange(val) {
    if (val.startsWith('UTC')) {
      setSelectTimezoneValue(val);
    } else {
      setSelectPlaceValue(val);
    }
  }

  function mapFunctionTZ({ offset }, i) {
    return <option key={ i } value={ offset }>{ offset }</option>;
  }

  function mapFunctionPL({ place }, i) {
    return <option key={ i } value={ place }>{ place }</option>;
  }



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

  useEffect(() => {
    if (
      (radioValue == 'timezone' && (selectTimezoneValue == 'UTC+/-...' || (!offsetTZCheckboxValue && !nameTZCheckboxValue))) ||
      (radioValue == 'place' && (selectPlaceValue == 'Place...' || (!namePLCheckboxValue && !offsetPLCheckboxValue)))
    ) {
      setDisableSendBtn(true);
    } else {
      setDisableSendBtn(false);
    }
  }, [
    radioValue,
    selectTimezoneValue,
    offsetTZCheckboxValue,
    nameTZCheckboxValue,
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

            <Radio
              text="Time Zone"
              onChange={ handleRadioChange }
              value="timezone"
            />

            <Radio
              text="Place"
              onChange={ handleRadioChange }
              value="place"
            />

          </div>
        </fieldset>

        {
          radioValue &&
            <fieldset>
              <legend>&nbsp;&nbsp;Select input:&nbsp;&nbsp;</legend>
              {
                radioValue == "timezone" &&
                  <div className={ selectdiv }>

                    <Select
                      text="offset"
                      value={ selectTimezoneValue }
                      onChange={ handleSelectChange }
                      list={ offsetList }
                      mapFunc={ mapFunctionTZ }
                    />



                  </div>
              }

              {
                radioValue == "place" &&
                  <div className={ selectdiv }>


                    <Select
                      text="place"
                      value={ selectPlaceValue }
                      onChange={ handleSelectChange }
                      list={ placeList }
                      mapFunc={ mapFunctionPL }
                    />



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
  <p className={ p }>Your query:</p>
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
        { ...(disableSendBtn ? { 'disabled': true } : {}) }
      >
        submit query
      </button>
    </>
}
    </section>
  );

}
