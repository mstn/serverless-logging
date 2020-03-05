const fetch = require('node-fetch');

const SERVER_URL = process.env.SERVER_URL + '/log' || 'http://localhost:3000';

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

  await Promise.all(promises);

  return {
    statusCode: 200,
    body: 'DONE',
  };

}

exports.handler = handler;