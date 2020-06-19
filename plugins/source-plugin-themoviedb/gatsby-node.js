// constants for your GraphQL Post and Author types
const GENRE_NODE_TYPE = `Genre`;
const MOVIE_NODE_TYPE = `Movie`;
const { fetchGenre } = require('./datafetchs/genre');
const { fetchMoviesByGenre } = require('./datafetchs/moviesByGenre');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Genre implements Node @dontInfer {
      name: String!
    }

    type Movie implements Node @dontInfer {
      popularity: Float!
      vote_average: Float!
      vote_count: Int!
      video: Boolean!
      poster_path: String!
      adult: Boolean!
      backdrop_path: String!
      original_language: String!
      original_title: String!
      title: String!
      # create relationships between Movie and Genre nodes
      genre_ids: [Genre!]! @link
      overview: String!
      release_date: String!
    }
    `);
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }) => {
  const { createNode } = actions;

  try {
    const { genres } = await fetchGenre();

    for (let index = 0; index < genres.length; index++) {
      const movies = await fetchMoviesByGenre(genres[index].id);

      createNode({
        ...genres[index],
        id: createNodeId(`${GENRE_NODE_TYPE}-${genres[index].id}`),
        parent: null,
        children: [],
        internal: {
          type: GENRE_NODE_TYPE,
          content: JSON.stringify(genres[index]),
          contentDigest: createContentDigest(genres[index])
        }
      });

      movies.results.forEach(movie => {
        createNode({
          ...movie,
          id: createNodeId(`${MOVIE_NODE_TYPE}-${movie.id}`),
          parent: null,
          children: [],
          internal: {
            type: MOVIE_NODE_TYPE,
            content: JSON.stringify(movie),
            contentDigest: createContentDigest(movie)
          }
        });
      });
    }
  } catch (exception) {
    console.error(`Failed to retrieve user informations: (${exception})`);
  }

  return;
};
