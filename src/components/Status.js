import React from 'react';
// import { h2 } from '../styles/Form.module.css';
// import { h22, h3 } from '../styles/Results.module.css';
import { err } from '../styles/index.css';

export default function Status({ statuses }) {
  const messages = statuses ? statuses.map((status, ind) => <li className={ err } key={ ind }>{ status }</li>) : null;

  return (
    <section>
      {
        statuses && <ul>{ messages }</ul>
      }
    </section>
  );

}
