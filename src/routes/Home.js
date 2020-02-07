import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Movie from "../components/Movie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #d8cccc;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4286f4,
    #373b44
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4286f4,
    #373b44
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 8vh;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.16),
    0 0.3rem 0.5rem rgba(0, 0, 0, 0.23);
  border-radius: 0rem 0rem 0.2rem 0.2rem;
  overflow: hidden;
`;

const Title = styled.div`
  color: #eaeaea;
  font-size: 2rem;
  font-weight: bolder;
  margin-bottom: 1rem;
`;

const Subtitle = styled.div`
  color: #eaeaea;
  font-size: 1rem;
  font-weight: bolder;
`;

const Loading = styled.div`
  font-size: 18px;
  font-weight: 500;
  opacity: 0.5;
  margin: auto;
  margin-top: 35vh;
  height: 100vh;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
`;

const Spinner = styled.div`
  height: 4rem;
  width: 4rem;
  color: rgba(90, 90, 90, 0.2);
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-right-color: #5a5a5a;
  animation: rotate 1s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  console.log(error);
  return (
    <Container>
      <Helmet>
        <title>Apollo Movie App</title>
      </Helmet>
      <Header>
        <Title>
          Movie Collection
          <span role="img" aria-label="coffee" style={{ marginLeft: "1rem" }}>
            ☕️
          </span>
        </Title>
        <Subtitle>Choose the movie if you want to know more</Subtitle>
      </Header>
      <div style={{ padding: "0.5rem", textAlign: "center" }}>
        {loading && (
          <Loading>
            <Spinner />
          </Loading>
        )}
        {!loading && data.movies && (
          <Movies>
            {data.movies.map(m => (
              <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
            ))}
          </Movies>
        )}
      </div>
    </Container>
  );
};
