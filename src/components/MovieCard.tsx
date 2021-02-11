import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import React, { useState } from "react";
import { IMovie } from "../interfaces/movie";
import "./MovieCard.css";
import { MovieDetail } from "./MovieDetail";

interface Props {
  movie: IMovie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const [openModal, setOpenModal] = useState(false);
  const [snippet, setSnippet] = useState(false);

  const getWikipediaSearchUrlFor = (text: string) => {
    return `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURI(
      text
    )}&format=json`;
  };


  const handleTitleClick = async (movie: IMovie) => {
    const res = await fetch(getWikipediaSearchUrlFor(movie.name), {
      method: "GET",
    }).then((res) => res.json());
    setSnippet(res.query.search[0].snippet);
    setOpenModal(true);
  };


  return (
    <>
      <IonCard className="Card">
        {movie?.img?.url && <IonImg src={movie.img.url} />}
        <IonCardHeader>
          <IonItem button onClick={() => handleTitleClick(movie)}>
            <IonLabel>{movie.name}</IonLabel>
          </IonItem>
          <IonCardSubtitle>
            {new Date(movie.releaseDate).toLocaleDateString()}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{movie.overview}</IonCardContent>
      </IonCard>

      <MovieDetail
        movie={movie}
        openModal={openModal}
        snippet={snippet}
        handleCloseModal={() => setOpenModal(false)}
      ></MovieDetail>
    </>
  );
};
