import React from 'react';
import '../styles/Select.module.css';

export default function Select({ text, value, onChange }) {

  return (
    <label>
      Select { text }:
      <select
        value={ value }
        onChange={e => setSelectTimezoneValue(e.target.value)}
      >
        <option hidden>{ value }</option>
        {offsetList.map(({ offset }, i) => <option key={ i } value={ offset }>{ offset }</option>)}
      </select>
    </label>
  );

}
