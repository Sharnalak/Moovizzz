import React from 'react';

import Layout from '../components/Layout';
import Thumbnail from '../components/Thumbnail';

export default function Home({ data }) {
  const movies = data.allMovie.nodes;

  return (
    <Layout>
      <h1>Hello Gatsby!</h1>
      <ul>{movies && movies.map(movie => <Thumbnail {...movie} />)}</ul>
    </Layout>
  );
}

export const query = graphql`
  query MyQuery {
    allMovie {
      nodes {
        title
        genre_ids {
          name
        }
        remotePosterImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
