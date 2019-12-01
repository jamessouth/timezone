import React from 'react';
import { h2 } from '../styles/Form.module.css';
import { h22, h3, li, span } from '../styles/Results.module.css';

export default function Results({ places, offset }) {
  const locations = places ? places.map((place, ind) => <li className={ li } key={ ind }>{ place }</li>) : null;

  return (
    <section>
      <h2 className={ [h2, h22, 'font-effect-decaying'].join(' ') }>Query Results</h2>
      {
        offset && <><h3 className={ [h3, 'font-effect-distressed-wood'].join(' ') }>Offset: </h3><span className={ span }>{ offset }</span></>
      }
      {
        places && <><h3 className={ [h3, 'font-effect-distressed-wood'].join(' ') }>Places: </h3><ul>{ locations }</ul></>
      }
    </section>
  );

}
