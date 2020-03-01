import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Radio.module.css';

export default function Radio({
  text,
  onChange,
  value,
}) {

  return (
    <label>
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
  value: PropTypes.bool
}