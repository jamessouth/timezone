import React from 'react';
import PropTypes from 'prop-types';
import { p } from '../styles/Status.module.css';

export default function Status({ status }) {

  return (
    <div>
      {
        status && <p className={ p }>{ status }</p>
      }
    </div>
  );

}

Status.propTypes = {
  status: PropTypes.string
}