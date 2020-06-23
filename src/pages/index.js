import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Thumbnail from '../components/Thumbnail';

const List = styled.ul`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function Home({ data }) {
  const movies = data.allMovie.nodes;

  return (
    <Layout>
      <List>{movies && movies.map(movie => <Thumbnail key={movie.id} {...movie} />)}</List>
    </Layout>
  );
}

export const query = graphql`
  query MyQuery {
    allMovie {
      nodes {
        id
        title
        genre_ids {
          id
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
