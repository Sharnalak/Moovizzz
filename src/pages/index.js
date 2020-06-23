import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Thumbnail from '../components/Thumbnail';

const List = styled.ul`
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
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
        fields {
          slug
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
