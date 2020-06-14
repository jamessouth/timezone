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
  loc,
} from '../styles/Results.module.css';

export default function Results({
  places,
  offset,
  flag,
  name,
  offsets,
}) {
  
  const locations = places ?
    places.map(({name, flag}, ind) =>
      <li className={ li } key={ ind }>
        {
          flag &&
            <img style={{ marginRight: '10px' }} src={ `data:image/png;base64,${flag}` }/>
        }

        <p className={ p }>
          { name }
        </p>
      </li>) :
    null;

  const tzs = offsets ?
    offsets.map((off, ind) =>
      <li className={ li } key={ ind }>
        <p className={ p }>
          { off }
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
        offset && <><h3 className={ h3 }>Offset:</h3><span className={ span }>{ offset }</span></>
      }
      {
        places && <><h3 className={ h3 }>Places:</h3><ul className={ ul }>{ locations }</ul></>
      }
      {
        name &&
          <>
            <h3 className={ h3 }>
              Location:
            </h3>
            <div className={ loc }>
              <img
                style={{ marginRight: '10px' }}
                src={ `data:image/png;base64,${flag}` }
              />
              <span className={ span }>
                { name }
              </span>
            </div>
          </>
      }
      {
        offsets && <><h3 className={ h3 }>Time Zones:</h3><ul className={ ul }>{ tzs }</ul></>
      }
    </section>
  );

}

Results.propTypes = {
  places: PropTypes.array,
  offset: PropTypes.string
}