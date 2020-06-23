import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

export default function Movie({ data: { movie } }) {
  return (
    <Layout>
      <div>
        <p>title: {movie.title}</p>
        <p>original_title: {movie.original_title}</p>
        <p>original_language: {movie.original_language}</p>
        <p>overview: {movie.overview}</p>
        <p>popularity: {movie.popularity}</p>
        <p>release_date: {movie.release_date}</p>
        <p>vote_average: {movie.vote_average}</p>
        <p>vote_count: {movie.vote_count}</p>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    movie(fields: { slug: { eq: $slug } }) {
      title
      original_title
      original_language
      overview
      popularity
      release_date
      vote_average
      vote_count
    }
  }
`;
