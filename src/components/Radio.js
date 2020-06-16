import React from 'react';
import PropTypes from 'prop-types';
import { lab } from '../styles/Radio.module.css';
import { inp } from '../styles/index.css';

export default function Radio({
  text,
  onChange,
  value,
}) {

  return (
    <label className={ [inp, lab].join(' ') }>
      { text }
      <input
        onChange={ e => onChange(e.target.value) }
        type="radio"
        name="queryType"
        value={ value }
      />
    </label>
  );

}

Radio.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}