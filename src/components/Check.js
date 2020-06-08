import React from 'react';
import PropTypes from 'prop-types';
import { input, lab } from '../styles/Check.module.css';
import { inp } from '../styles/index.css';

export default function Check({
  text,
  onChange,
  value,
  dis,
}) {

  return (
    <label className={ [inp, lab].join(' ') }>
      { text }
      <input
        className={ input }
        onChange={ () => onChange() }
        type="checkbox"
        name="fields"
        value={ value }
        { ...( dis ? { 'disabled': true } : {}) }
      />
    </label>
  );

}

Check.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  dis: PropTypes.bool
}