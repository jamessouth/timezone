import React from 'react';
import { ul, li } from '../styles/Status.module.css';

export default function Status({ statuses }) {
  const messages = statuses ?
    statuses
      // .map((status, ind, arr) => )
      .map((status, ind, arr) => {

        return <li className={ li } key={ ind }>{ status }</li>;
      }) :
    null;

  return (
    <div>
      {
        statuses && <ul className={ ul }>{ messages }</ul>
      }
    </div>
  );

}
