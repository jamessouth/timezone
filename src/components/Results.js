import React from 'react';
import { h2 } from '../styles/Results.module.css';

export default function Results({ places, offset }) {
  const locations = places ? places.map((place, ind) => <li key={ ind }>{ place }</li>) : null;

  return (
    <section>
      <h2 className={ h2 }>Query Results:</h2>
      {
        offset && <><h3>Offset: </h3><span>{ offset }</span></>
      }
      {
        places && <><h3>Places: </h3><ul>{ locations }</ul></>
      }
    </section>
  );

}
