import React from 'react';
import PropTypes from 'prop-types';
import { h2 } from '../styles/Form.module.css';
import {
  h22,
  h3,
  ul,
  li,
  span,
  p,
  img,
} from '../styles/Results.module.css';

export default function Results({
  places,
  offset,
}) {
  
  const locations = places ?
    places.map(({name, flag}, ind) =>
      <li className={ li } key={ ind }>
       
        <img className={ img } src={ 'data:image/png;base64,' + flag }/>


        <p className={ p }>
          { name }
        </p>
      </li>) :
    null;

  // , 'font-effect-decaying'
  // [h3, 'font-effect-distressed-wood'].join(' ')
  // [h3, 'font-effect-distressed-wood'].join(' ')
  

  return (
    <section>
      <h2 className={ [h2, h22].join(' ') }>Query Results</h2>
      {
        offset && <><h3 className={ h3 }>Offset: </h3><span className={ span }>{ offset }</span></>
      }
      {
        places && <><h3 className={ h3 }>Places: </h3><ul className={ ul }>{ locations }</ul></>
      }
    </section>
  );

}

Results.propTypes = {
  places: PropTypes.array,
  offset: PropTypes.string
}