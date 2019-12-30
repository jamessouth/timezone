import React from 'react';
import '../styles/Check.module.css';

export default function Check({ text, onChange, value }) {

  return (
    <label>
      { text }
      <input
        onChange={ () => onChange() }
        type="checkbox"
        name="fields"
        value={ value }
      />
    </label>
  );

}
