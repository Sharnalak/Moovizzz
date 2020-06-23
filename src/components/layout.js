import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #141414;
    color: #fff;
    padding: 32px;
  }

  a {
    color: #fff;
  }

  h1 {
    font-size: 32px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <Wrapper>
      <GlobalStyle />
      <header>
        <Link to="/">
          <h1>{data.site.siteMetadata.title}</h1>
        </Link>
      </header>
      {children}
    </Wrapper>
  );
}
