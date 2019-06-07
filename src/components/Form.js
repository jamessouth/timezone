import React, { useState } from 'react';

export default function Form(props) {
  let [queryText, updateQueryText] = useState('');

  return (
    <form>
      <textarea value={queryText} onChange={e => updateQueryText(e.target.value)} cols="40" rows="15" placeholder="{query...}" name="query"></textarea>
      <button type="button" onClick={() => props.postQuery(queryText)}>submit query</button>
    </form>
  );

}
