import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Check from './Check';
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
  radiodiv
} from '../styles/Form.module.css';

export default function Form({
  offsetList,
  placeList,
  postQuery,
}) {

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

console.log('oi;oijoij: ', );

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
    selectPlaceValue,
    offsetTZCheckboxValue,
    nameTZCheckboxValue,
    namePLCheckboxValue,
    offsetPLCheckboxValue,
  ]);

  // [h2, 'font-effect-decaying'].join(' ')

  return (
    <section>
      <h2 className={ h2 }>Construct GraphQL Query</h2>
      <form className={ form }>

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
            <>
              <fieldset>
                <legend>&nbsp;&nbsp;Select input:&nbsp;&nbsp;</legend>
        
                  <Select
                    text={ radioValue == 'timezone' ? "offset" : "place" }
                    value={ radioValue == 'timezone' ? selectTimezoneValue : selectPlaceValue }
                    onChange={ handleSelectChange }
                    list={ radioValue == 'timezone' ? offsetList : placeList }
                  />

              </fieldset>

              <fieldset>
                <legend>&nbsp;&nbsp;Select data:&nbsp;&nbsp;</legend>

                {
                  radioValue == 'timezone' &&
                    <div className={ [check, checkdiv].join(' ') }>

                      <Check
                        text="offset"
                        onChange={ () => setOffsetTZCheckboxValue(val => !val) }
                        value={ offsetTZCheckboxValue }
                      />

                      <p className={ [p, p2].join(' ') }>places:</p>

                      <Check
                        text="&#8735;name"
                        onChange={ () => setNameTZCheckboxValue(val => !val) }
                        value={ nameTZCheckboxValue }
                      />

                      <Check
                        text="&#8735;&nbsp;&nbsp;flag"
                        onChange={ () => setFlagCheckboxValue(val => !val) }
                        value={ flagCheckboxValue }
                        dis={ !nameTZCheckboxValue }
                      />

                    </div>
                }

                {
                  radioValue == 'place' &&
                    <div className={ [check, checkdiv2].join(' ') }>

                      <Check
                        text="name"
                        onChange={ () => setNamePLCheckboxValue(val => !val) }
                        value={ namePLCheckboxValue }
                      />

                      <Check
                        text="offsets"
                        onChange={ () => setOffsetPLCheckboxValue(val => !val) }
                        value={ offsetPLCheckboxValue }
                      />

                    </div>
                }
              </fieldset>
            </>
        }


      </form>

      {
        radioValue &&
<>
  <p className={ p }>Your query:</p>
  {
    radioValue == 'timezone' &&
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
    radioValue == 'place' &&
    <pre>
      <code ref={ code1 }>{`{
  place(name: "${selectPlaceValue}") {
    ${namePLCheckboxValue ? 'name' : ''}
    flag
    ${offsetPLCheckboxValue ? 'offsets' : ''}
  }
}`}</code>
    </pre>
  }

  <button
    type="button"
    className={ button }
    onClick={ () => postQuery(queryText, radioValue) }
    { ...(disableSendBtn ? { 'disabled': true } : {}) }
  >
        submit query
  </button>
</>
      }
    </section>
  );

}

Form.propTypes = {
  offsetList: PropTypes.array,
  placeList: PropTypes.array,
  postQuery: PropTypes.func,
  offset: PropTypes.string,
  place: PropTypes.string
}