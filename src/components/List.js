import React from 'react';

export default function List(props) {
  const places = props.places.map((place, ind) => <li key={ind}>{place}</li>);

  return (
    <>
    <p>hiuhoiuh</p>
    <ul>{places}</ul>
    </>
  );

}
