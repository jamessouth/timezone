import React from 'react';
import {
  li,
  p,
  img,
} from '../styles/Results.module.css';

export default function useResultsState(places, offsets) {

  const locations = places ?
    places.map(({name, flag}, ind) =>
      <li className={ li } key={ ind }>
        {
          flag &&
            <img className={ img } src={ `data:image/png;base64,${flag}` }/>
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

  const TZtitle = tzs && tzs.length == 1 ? 'Time Zone:' : 'Time Zones:';
  
  const PLtitle = locations && locations.length == 1 ? 'Place:' : 'Places:';

  return {
    locations,
    tzs,
    TZtitle,
    PLtitle,
  };

}