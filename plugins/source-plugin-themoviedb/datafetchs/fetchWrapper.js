const fetch = require('node-fetch');

exports.fetchApi = url => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTUzYmIzMmRhOWEyODEyMmE1YzE1MWE2MmJkYzkzMCIsInN1YiI6IjVlZWJhYTQzZGI0ZWQ2MDAzNWNjMWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9J9abt1BeU5-eQftRwAXtWVG1r3CdoIwuUzSBdRZ_I',
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, options);
};
