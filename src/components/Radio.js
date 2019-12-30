import React, { useState, useEffect, useRef } from 'react';
import { radiodiv } from '../styles/Radio.module.css';

export default function Radio({ text, onChange, value }) {

  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <label>
      { text }
      <input
        onChange={ handleChange }
        type="radio"
        name="queryType"
        value={ value }
      />
    </label>
  );


}
