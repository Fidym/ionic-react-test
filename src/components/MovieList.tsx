import { gql, useQuery } from "@apollo/client";
import { IonGrid, IonRow, IonCol, IonCard, IonSpinner } from "@ionic/react";
import React from "react";
import { IMovie } from "../interfaces/movie";
import { MovieCard } from "./MovieCard";
import "./MovieList.css";

interface Props {
  searchText: string;
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
    }
  }
`;

export const MovieList: React.FC<Props> = ({ searchText }) => {
  const { loading, error, data } = useQuery<{ searchMovies: IMovie[] }>(
    MOVIES,
    {
      variables: { title: searchText },
    }
  );

  const movies = data?.searchMovies || [];

  return (
    <>
      {movies.length > 0 ? (
        <IonGrid>
          <IonRow>
            {movies.map((movie) => (
              <IonCol key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      ) : loading ? (
        <IonSpinner className="CenteredAlert" name="circles" />
      ) : searchText ? (
        <IonCard className="NoMovieFound CenteredAlert">
          {" "}
          No movies found !{" "}
        </IonCard>
      ) : (
        ""
      )}
    </>
  );
};
