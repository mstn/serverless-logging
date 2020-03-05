const waitFor = (time) => new Promise(resolve => setTimeout(resolve, time));

const LOGGER_TIMEOUT = process.env.LOGGER_TIMEOUT || 5000;

const handler = async (event) => {
  // add some latency to make things funnier
  await waitFor(LOGGER_TIMEOUT);
  console.log(`[${(new Date()).toISOString()}] LOGGED: ${event.body}`);
  return {
    statusCode: 201,
    body: 'DONE'
  };
}

exports.handler = handler;