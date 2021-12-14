import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip,
  IonNote,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import { IMovie } from "../interfaces/movie";
import "./MovieCard.css";
import { MovieDetail } from "./MovieDetail";
import { star } from "ionicons/icons";

interface Props {
  movie: IMovie;
  handleRelatedSearch: (id: number) => void;
}

export const MovieCard: React.FC<Props> = ({ movie, handleRelatedSearch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [snippet, setSnippet] = useState(false);

  const getWikipediaSearchUrlFor = (text: string) => {
    const wikiFetchConfig = {
      action: "query",
      format: "json",
      origin: "*",
      list: "search",
      srlimit: 1,
      srsearch: text,
      srnamespace: 0,
      srprop: "snippet",
    };
    const queryString = Object.keys(wikiFetchConfig)
      .map(
        (k) =>
          encodeURIComponent(k) +
          "=" +
          encodeURIComponent((wikiFetchConfig as any)[k])
      )
      .join("&");

    return `https://en.wikipedia.org/w/api.php?${queryString}`;
  };

  const handleTitleClick = async (movie: IMovie) => {
    try {
      const responseJson = await fetch(getWikipediaSearchUrlFor(movie.name), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());
      setSnippet(responseJson.query.search[0].snippet);
      setOpenModal(true);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <IonCard className="Card">
        {movie?.img?.url && <IonImg src={movie.img.url} />}
        <IonCardHeader>
          <IonItem button onClick={() => handleTitleClick(movie)}>
            <IonLabel>{movie.name}</IonLabel>
            <IonNote>
              {new Date(movie.releaseDate).toLocaleDateString()}
            </IonNote>
          </IonItem>
          <IonChip>
            <IonLabel>{movie.score} / 10</IonLabel>
            <IonIcon icon={star} />
          </IonChip>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonTextarea
              readonly
              value={movie.overview}
              rows={10}
            ></IonTextarea>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <MovieDetail
        movie={movie}
        openModal={openModal}
        snippet={snippet}
        handleCloseModal={() => setOpenModal(false)}
        handleRelatedSearch={handleRelatedSearch}
      ></MovieDetail>
    </>
  );
};
