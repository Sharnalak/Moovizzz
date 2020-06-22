import React from 'react';
import Img from 'gatsby-image';

function Thumbnail(props) {
  const { title, genre_ids, remotePosterImage } = props;
  return (
    <div>
      <p>{title}</p>
      {remotePosterImage && (
        <Img fluid={remotePosterImage.childImageSharp.fluid} alt="A corgi smiling happily" />
      )}
      {genre_ids.length && (
        <ul>
          {genre_ids.map(genre => (
            <li>{genre.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Thumbnail;
