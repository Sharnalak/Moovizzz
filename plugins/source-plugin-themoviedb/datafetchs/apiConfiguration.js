const { fetchApi } = require('./fetchWrapper');

exports.fetchApiConfig = async () => {
  const response = await fetchApi('https://api.themoviedb.org/3/configuration');
  return response.json();
};
