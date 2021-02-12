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
  IonItem,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { close, openOutline } from "ionicons/icons";
import { IMovie } from "../interfaces/movie";

interface Props {
  movie: IMovie;
  snippet: any;
  openModal: boolean;
  handleCloseModal: () => void;
  handleRelatedSearch: (id: number) => void;
}

export const MovieDetail: React.FC<Props> = ({
  movie,
  openModal,
  snippet,
  handleCloseModal,
  handleRelatedSearch,
}) => {
  const [wikiLink, setWikiLink] = useState("");
  const [imdbLink, setImdbLink] = useState("");

  async function fetchWikiLink() {
    return fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURI(
        movie.name
      )}`,
      {
        method: "Get",
      }
    )
      .then((res) => res.json())
      .then((res) => (res && res[3] && res[3][0]) || "");
  }

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && setImdbLink(
      `https://www.imdb.com/search/title/?title=${encodeURI(movie.name)}`
    );
    fetchWikiLink()
      .then((link) => isSubscribed ? setWikiLink(link) : "")
      .catch((error) => isSubscribed ? console.log({error}) : "")
    return () => {
      isSubscribed = false;
    };
  }, []);

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
      <IonItem>
        <IonLabel>From wikipedia:</IonLabel>
      </IonItem>
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
          <IonRow>
            <IonCol>
              <IonButton
                color="secondary"
                expand="block"
                className="LinkButton"
                onClick={() => {
                  handleCloseModal();
                  handleRelatedSearch(parseInt(movie.id));
                }}
              >
                Search related movies
                <IonIcon slot="search" icon={openOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonModal>
  );
};
