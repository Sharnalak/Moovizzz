const { fetchApi } = require('./fetchWrapper');

exports.fetchGenre = async () => {
  const response = await fetchApi('https://api.themoviedb.org/3/genre/movie/list');
  return response.json();
};
