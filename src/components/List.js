import React from 'react';

export default function List({ places }) {
  const locations = places.map((place, ind) => <li key={ind}>{place}</li>);

  return (
    <ul>{locations}</ul>
  );

}
