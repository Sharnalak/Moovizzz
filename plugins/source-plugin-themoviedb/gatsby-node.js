// constants for your GraphQL
const CONFIG_NODE_TYPE = `TMDB_Config`;
const GENRE_NODE_TYPE = `Genre`;
const MOVIE_NODE_TYPE = `Movie`;

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const { fetchApiConfig } = require('./datafetchs/apiConfiguration');
const { fetchGenre } = require('./datafetchs/genre');
const { fetchMoviesByGenre } = require('./datafetchs/moviesByGenre');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  createTypes([
    `
    type Genre implements Node {
      name: String!
    }
    `,
    schema.buildObjectType({
      name: 'Movie',
      fields: {
        popularity: 'Float!',
        vote_average: 'Float!',
        vote_count: 'Int!',
        video: 'Boolean!',
        poster_path: 'String',
        adult: 'Boolean!',
        backdrop_path: 'String',
        original_language: 'String',
        original_title: 'String',
        title: 'String!',
        overview: 'String!',
        release_date: 'String!',
        genre_ids: {
          type: '[Genre!]!',
          resolve: (source, args, context, info) => {
            genres = context.nodeModel.getAllNodes({ type: 'Genre' }).filter(genre => {
              condition = source.genre_ids.includes(parseInt(genre.id));
              return condition;
            });
            return genres;
          }
        }
      },
      interfaces: ['Node']
    })
  ]);
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }) => {
  const { createNode } = actions;

  const apiConfig = await fetchApiConfig();

  createNode({
    ...apiConfig,
    id: createNodeId(`${CONFIG_NODE_TYPE}`),
    parent: null,
    children: [],
    internal: {
      type: CONFIG_NODE_TYPE,
      content: JSON.stringify(apiConfig),
      contentDigest: createContentDigest(apiConfig)
    }
  });

  try {
    const { genres } = await fetchGenre();

    for (let index = 0; index < genres.length; index++) {
      const movies = await fetchMoviesByGenre(genres[index].id);

      createNode({
        ...genres[index],
        id: `${genres[index].id}`,
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

// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode },
  createNodeId,
  getCache
}) => {
  if (node.internal.type === MOVIE_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: `https://image.tmdb.org/t/p/w780/${node.poster_path}`,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache
    });
    if (fileNode) {
      node.remotePosterImage___NODE = fileNode.id;
    }
  }
};
