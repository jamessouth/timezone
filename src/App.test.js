// import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';// , Try


describe.skip = ('render App', async assert => {
  const $ = render();// App()

  assert({
    given: 'a component',
    should: 'render its markup',
    actual: $('.intro').html().trim(),
    expected: 'Hello World'
  });

  // assert({
  //   given: 'NaN',
  //   should: 'throw',
  //   actual: Try(sum, 1, NaN),
  //   expected: new TypeError('NaN')
  // });
});
