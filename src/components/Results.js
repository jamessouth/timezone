import React from 'react';
import PropTypes from 'prop-types';
import { h2 } from '../styles/Form.module.css';
import {
  h22,
  h3,
  ul,
  span,
  loc,
  img,
} from '../styles/Results.module.css';
import useResultsState from '../hooks/useResultsState';

export default function Results({
  places,
  offset,
  flag,
  name,
  offsets,
}) {
  
  const {
    locations,
    tzs,
    TZtitle,
    PLtitle,
  } = useResultsState(places, offsets);

  return (
    <section>
      <h2 className={ [h2, h22].join(' ') }>Query Results</h2>
      {
        offset && <><h3 className={ h3 }>Offset:</h3><span className={ span }>{ offset }</span></>
      }
      {
        places && <><h3 className={ h3 }>{ PLtitle }</h3><ul className={ ul }>{ locations }</ul></>
      }
      {
        name &&
          <>
            <h3 className={ h3 }>
              Location:
            </h3>
            <div className={ loc }>
              <img
                className={ img }
                src={ `data:image/png;base64,${flag}` }
              />
              <span className={ span }>
                { name }
              </span>
            </div>
          </>
      }
      {
        offsets && <><h3 className={ h3 }>{ TZtitle }</h3><ul className={ ul }>{ tzs }</ul></>
      }
    </section>
  );

}

Results.propTypes = {
  places: PropTypes.array,
  offset: PropTypes.string,
  flag: PropTypes.string,
  name: PropTypes.string,
  offsets: PropTypes.array,
}