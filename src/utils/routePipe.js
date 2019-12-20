const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

import pipeError from './pipeError';

export default function routePipe(url, res) {
  return function inner(ct) {
    res.writeHead(200, { 'Content-Type': ct });
    return pipeline(
      fs.createReadStream(path.join('dist', url)),
      res,
      (err) => pipeError(err, url)
    );
  };
}
