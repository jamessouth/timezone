export default function pipeError(err, url) {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log(`Pipeline succeeded: ${url}`);
  }
};
