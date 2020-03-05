const fetch = require('node-fetch');

const SERVER_URL = process.env.SERVER_URL + '/log' || 'http://localhost:3000';
const LOGGER_TIMEOUT = process.env.LOGGER_TIMEOUT || 10000;

const handler = async () => {

  const promises = [];

  console.log(`[${(new Date()).toISOString()}] STARTED LAMBDA`);

  console.log(`[${(new Date()).toISOString()}] before log`);

  promises.push(fetch(SERVER_URL, { method: 'POST', body: JSON.stringify({ message: 'Create user' }) }));

  console.log(`[${(new Date()).toISOString()}] after log`);

  console.log(`[${(new Date()).toISOString()}] before log`);

  promises.push(fetch(SERVER_URL, { method: 'POST', body: JSON.stringify({ message: 'Return' }) }));

  console.log(`[${(new Date()).toISOString()}] after log`);

  console.log(`[${(new Date()).toISOString()}] END LAMBDA`);

  let timeoutHandle = undefined;

  const getTimeoutPromise = () => new Promise( (_resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      reject();
    }, LOGGER_TIMEOUT);
  })
  const allPromises = Promise.all(promises);

  await Promise.race([
    allPromises.then(() => {
      console.log('CLEAR TIMEOUT');
      if (timeoutHandle) clearTimeout(timeoutHandle);
    }),
    getTimeoutPromise().catch(() => {
      console.log('>>> TIMEOUT <<<');
    }),
  ]);

  return {
    statusCode: 200,
    body: 'DONE',
  };

}

exports.handler = handler;