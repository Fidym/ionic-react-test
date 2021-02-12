import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SearchBox } from "../components/SearchBox";
import "./Home.css";
import React, { useState } from "react";
import { MovieList } from "../components/MovieList";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [relatedId, setRelatedId] = useState<number | null>(null);

  const handleSeachTextChange = (text: string) => {
    setSearchText(text);
    setRelatedId(null)
  };

  const searchRelatedMovies = (id: number) => {
    setSearchText(null)
    setRelatedId(id)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Movie search app</IonTitle>
        </IonToolbar>
        <IonToolbar className="ToolBar">
          <SearchBox handleChange={handleSeachTextChange}></SearchBox>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MovieList
          searchText={searchText}
          relatedId={relatedId}
          handleRelatedSearch={searchRelatedMovies}
        ></MovieList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
