import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-bottom: 10vh;
  width: 80vw;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`;

const Subtitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.6rem;
  color: #ffffff;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 500;
`;

const Poster = styled.div`
  width: 80vw;
  height: 60vh;
  background: url(${props => props.bg});
  margin-bottom: auto;
  margin-top: auto;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.16),
    0 0.3rem 0.5rem rgba(0, 0, 0, 0.23);
  overflow: hidden;
  background-size: cover;
  background-position: center center;
`;

const Spinner = styled.div`
  height: 4rem;
  width: 4rem;
  margin-top: 40vh;
  text-align: center;
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

export default () => {
  const { id } = useParams();
  let numId = Number(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: numId }
  });
  return (
    <React.Fragment>
      {loading && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            textAlign: "center",
            background: "#56ccf2"
          }}
        >
          <Spinner />
        </div>
      )}
      {!loading && data.movie && (
        <Container>
          <Poster bg={data.movie.medium_cover_image}></Poster>
          <Column>
            <Subtitle>
              <Title>{data.movie.title}</Title>
              <Subtitle>
                {data.movie.language} - ⓢ : {data.movie.rating}
              </Subtitle>
              <Description>{data.movie.description_intro}</Description>
            </Subtitle>
          </Column>
        </Container>
      )}
    </React.Fragment>
  );
};
