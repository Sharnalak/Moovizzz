const { fetchApi } = require('./fetchWrapper');

exports.fetchMoviesByGenre = async genreId => {
  const response = await fetchApi(
    `https://api.themoviedb.org/3/discover/movie/?with_genres=${genreId}`
  );
  return response.json();
};
