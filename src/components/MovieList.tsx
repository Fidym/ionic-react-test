import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { IonGrid, IonRow, IonCol, IonCard, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import { IMovie, IRecommendedMovies } from "../interfaces/movie";
import { MovieCard } from "./MovieCard";
import { MovieDetail } from "./MovieDetail";
import "./MovieList.css";

interface Props {
  searchText: string | null;
  relatedId: number | null;
  handleRelatedSearch: (id: number) => void
}

const MOVIES = gql`
  query SearchMovies($title: String!) {
    searchMovies(query: $title) {
      id
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      name
      overview
      releaseDate
      score
    }
  }
`;

const SEARCH_RELATED = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      recommended {
        id
        img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }
        name
        overview
        releaseDate
        score
      }
    }
  }
`;

export const MovieList: React.FC<Props> = ({ searchText, relatedId, handleRelatedSearch }) => {

  const { loading, data } = useQuery<{ searchMovies: IMovie[] }>(
    MOVIES,
    { 
      skip: !searchText,
      variables: { title: searchText },
    }
  );
  const { loading: reloading, data: reData } = useQuery<{ movie: IRecommendedMovies }>(
    SEARCH_RELATED,
    { 
      skip: !relatedId,
      variables: { id: relatedId },
    }
  );

  const movies =
    (searchText && data?.searchMovies) ||
    (relatedId && reData?.movie?.recommended) ||
    [];

  return (
    <>
      {movies.length > 0 ? (
        <IonGrid>
          <IonRow>
            {movies
              .filter((movie) => movie.img?.url)
              .map((movie) => (
                <IonCol key={movie.id} className="CenterCol">
                  <MovieCard
                    movie={movie}
                    handleRelatedSearch={handleRelatedSearch}
                  ></MovieCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      ) : (loading || reloading) ? (
        <IonSpinner className="CenteredAlert" name="circles" />
      ) : searchText ? (
        <IonCard className="NoMovieFound CenteredAlert">
          No movies found !
        </IonCard>
      ) : (
        <IonCard className="NoMovieFound CenteredAlert">
          Type in a movie title !
        </IonCard>
      )}
    </>
  );
};
