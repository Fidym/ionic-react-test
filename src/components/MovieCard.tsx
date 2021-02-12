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
  handleRelatedSearch: (id: number) => void
}

export const MovieCard: React.FC<Props> = ({ movie , handleRelatedSearch}) => {
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
