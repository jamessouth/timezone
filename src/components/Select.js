import React from 'react';
import '../styles/Select.module.css';

export default function Select({ text, value, onChange, list, mapFunc }) {

  return (
    <label>
      Select { text }:
      <select
        value={ value }
        onChange={ e => onChange(e.target.value) }
      >
        <option hidden>{ value }</option>
        {list.map(mapFunc)}
      </select>
    </label>
  );

}
