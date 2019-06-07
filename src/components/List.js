import React from 'react';

export default function List(props) {
  const places = props.places.map((place, ind) => <li key={ind}>{place}</li>);

  return (
    <ul>{places}</ul>
  );

}
