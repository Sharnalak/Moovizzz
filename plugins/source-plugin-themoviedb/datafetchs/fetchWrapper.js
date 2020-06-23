const fetch = require('node-fetch');

exports.fetchApi = url => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + process.env.BEARERTOKEN,
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, options);
};
