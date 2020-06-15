import { useState, useEffect, useRef } from 'react';

export default function useFormState() {

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

  return {
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
  };

}