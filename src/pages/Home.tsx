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
  const [searchText, setSearchText] = useState<string>("");


  const handleSeachTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Movie search app</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <SearchBox
            handleChange={handleSeachTextChange}
          ></SearchBox>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MovieList searchText={searchText}></MovieList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
