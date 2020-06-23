import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  transition: transform 0.2s;
  position: relative;
  z-index: 1;

  .content {
    display: none;
    position: absolute;
    padding: 8px;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  &:hover {
    transform: scale(1.5);
    z-index: 2;

    .content {
      display: block;
    }
  }
`;

const NoImgSource = styled.div`
  background: red;
  width: 100%;
  height: 100%;
  position: relative;

  p {
    position: absolute;
    bottom: 0;
    left: 8px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const ListGenres = styled.ul`
  list-style: none;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-top: 16px;

  li {
    padding-right: 8px;
    margin: 0;
  }
`;

function Thumbnail(props) {
  const {
    title,
    genre_ids,
    remotePosterImage,
    fields: { slug }
  } = props;
  return (
    <Container>
      <Link to={slug}>
        {remotePosterImage ? (
          <Img
            fluid={remotePosterImage.childImageSharp.fluid}
            backgroundColor={'red'}
            alt="A corgi smiling happily"
          />
        ) : (
          <NoImgSource>
            <p>Source missing</p>
          </NoImgSource>
        )}
        <div className={`content`}>
          <Title>{title}</Title>
          {genre_ids.length && (
            <ListGenres>
              {genre_ids.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ListGenres>
          )}
        </div>
      </Link>
    </Container>
  );
}

export default Thumbnail;
