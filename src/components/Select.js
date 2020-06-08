import React from 'react';
import PropTypes from 'prop-types';
import { inp, lab, selectdiv } from '../styles/Select.module.css';

export default function Select({
  text,
  onChange,
  value,
  list,
  mapFunc,
}) {

  return (
    <div className={ selectdiv }>
      <label className={ [inp, lab].join(' ') } htmlFor={ text + '77' }>Select { text }:
        <select
          value={ value }
          id={ text + '77' }
          onChange={ e => onChange(e.target.value) }
        >
          <option hidden>{ value }</option>
          { list.map(mapFunc) }
        </select>
      </label>
    </div>
  );

}

Select.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  list: PropTypes.array,
  mapFunc: PropTypes.func
}