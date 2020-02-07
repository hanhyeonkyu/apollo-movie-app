import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
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
  margin-top: 2rem;
  margin-bottom: auto;
  width: 80vw;
  overflow-y: scroll;
  height: 28vh;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.6rem;
  color: #ffffff;
  font-weight: 400;
`;

const Description = styled.div`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 500;
`;

const Poster = styled.div`
  width: 80vw;
  height: 60vh;
  background: url(${props => props.bg});
  margin-bottom: auto;
  margin-top: 1rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.16),
    0 0.3rem 0.5rem rgba(0, 0, 0, 0.23);
  overflow: hidden;
  background-size: cover;
  background-position: center center;
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
  background: #56ccf2;
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

const RecommendTitle = styled.div`
  overflow-x: scroll;
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bolder;
`;

const RecommendContainer = styled.div`
  margin-top: 1rem;
  width: 90vw;
  display: flex;
  flex-direction: row;
  max-width: 90vw;
  overflow-x: auto;
  & > a {
    margin: 1rem;
    flex: 0 0 auto;
  }
`;

const RecommendMovie = styled.div`
  width: 30vw;
  height: 30vh;
  background: url(${props => props.recbg});
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.16),
    0 0.3rem 0.5rem rgba(0, 0, 0, 0.23);
  border-radius: 1rem;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  &:visited {
    width: 31vw;
    height: 31vh;
  }
  &:hover {
    width: 31vw;
    height: 31vh;
  }
  &:active {
    width: 31vw;
    height: 31vh;
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
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {!loading && data.movie && (
        <Container>
          <Poster bg={data.movie.medium_cover_image} />
          <Column>
            <Subtitle>
              <Title>{data.movie.title}</Title>
              <Subtitle>
                {data.movie.language} - ⓢ : {data.movie.rating}
              </Subtitle>
              <Description>{data.movie.description_intro}</Description>
            </Subtitle>
            <Link to={`/`}>
              <button
                style={{ position: "fixed", top: "0.5rem", left: "0.5rem" }}
              >
                <HomeIcon style={{ fontSize: "1.5rem", color: "#e2e2e2" }} />
              </button>
            </Link>
          </Column>
          <RecommendTitle>Recommend Movie</RecommendTitle>
          <RecommendContainer>
            {data.suggestions &&
              data.suggestions.map(sug => {
                return (
                  <React.Fragment key={sug.id}>
                    <Link to={`/${sug.id}`}>
                      <RecommendMovie recbg={sug.medium_cover_image} />
                    </Link>
                  </React.Fragment>
                );
              })}
          </RecommendContainer>
        </Container>
      )}
    </React.Fragment>
  );
};
