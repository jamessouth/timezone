import React from 'react';
import PropTypes from 'prop-types';
import Check from './Check';
import Radio from './Radio';
import Select from './Select';
import {
  button,
  check,
  checkdiv,
  checkdiv2,
  fs,
  h2,
  p,
  p2,
  radiodiv
} from '../styles/Form.module.css';
import useFormState from '../hooks/useFormState';

export default function Form({
  offsetList,
  placeList,
  postQuery,
}) {

  const {
    code1,
    disableSendBtn,
    flagCheckboxValue,
    handleRadioChange,
    handleSelectChange,
    namePLCheckboxValue,
    nameTZCheckboxValue,
    offsetPLCheckboxValue,
    offsetTZCheckboxValue,
    queryText,
    radioValue,
    selectPlaceValue,
    selectTimezoneValue,
    setFlagCheckboxValue,
    setNamePLCheckboxValue,
    setNameTZCheckboxValue,
    setOffsetPLCheckboxValue,
    setOffsetTZCheckboxValue,
  } = useFormState();

  return (
    <section>
      <h2 className={ h2 }>Construct GraphQL Query</h2>
      <form>
        <fieldset className={ radioValue ? fs : '' }>
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
              <fieldset className={ fs }>
                <legend>&nbsp;&nbsp;Select input:&nbsp;&nbsp;</legend>
                  <Select
                    text={ radioValue == 'timezone' ? "offset" : "place" }
                    value={ radioValue == 'timezone' ? selectTimezoneValue : selectPlaceValue }
                    onChange={ handleSelectChange }
                    list={ radioValue == 'timezone' ? offsetList : placeList }
                  />
              </fieldset>
              <fieldset className={ fs }>
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
}