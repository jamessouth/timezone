export default function pipeError(err, url) {
  if (err) {
    console.error('Pipeline failed.', err);
  } else { // eslint-disable-next-line no-console
    console.log(`Pipeline succeeded: ${url}`);
  }
}