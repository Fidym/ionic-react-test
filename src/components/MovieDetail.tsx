import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { close, openOutline } from "ionicons/icons";
import { IMovie } from "../interfaces/movie";

interface Props {
  movie: IMovie;
  snippet: any;
  openModal: boolean;
  handleCloseModal: () => void;
}

export const MovieDetail: React.FC<Props> = ({
  movie,
  openModal,
  snippet,
  handleCloseModal,
}) => {
  const [wikiLink, setWikiLink] = useState("");
  const [imdbLink, setImdbLink] = useState("");

  useEffect(() => {
    setImdbLink(
      `https://www.imdb.com/search/title/?title=${encodeURI(movie.name)}`
    );

    const getWikiLink = async (): Promise<void> => {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURI(
          movie.name
        )}`,
        {
          method: "Get",
        }
      ).then((res) => res.json());
      setWikiLink((res && res[3] && res[3][0]) || "");
    };

    getWikiLink();
  });

  const createMarkup = () => {
    return { __html: snippet || "" };
  };

  return (
    <IonModal
      isOpen={openModal}
      onDidDismiss={handleCloseModal}
      cssClass="CustomModal"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle> {movie.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleCloseModal}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLabel>
        <div
          className="ion-padding"
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
      </IonLabel>
      <IonToolbar className="LinkToolBar">
        <IonGrid>
          <IonRow>
            <IonCol>
              {wikiLink && (
                <IonButton
                expand="block"
                  className="LinkButton"
                  href={wikiLink}
                  target="blank"
                  onClick={handleCloseModal}
                >
                  Wiki
                  <IonIcon slot="end" icon={openOutline} />
                </IonButton>
              )}
            </IonCol>
            <IonCol>
              <IonButton
              expand="block"
                className="LinkButton"
                href={imdbLink}
                target="blank"
                onClick={handleCloseModal}
              >
                IMDB
                <IonIcon slot="end" icon={openOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonModal>
  );
};
