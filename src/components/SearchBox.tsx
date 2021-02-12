import { IonButton, IonSearchbar } from "@ionic/react";
import React, { useState } from "react";

interface Props {
    handleChange: (searchText: string) => void;
}

export const SearchBox: React.FC<Props> = ({handleChange}) => {

  const placeHolderText = "search for a movie..."

  const [inputText, setInputText] = useState("");

  const handleInputChange = (text: string | undefined) => {
    setInputText(text || "");
  };

  const handleButtonClick = () => {
    handleChange(inputText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  }



  return (
      <>
    <IonSearchbar
      value={inputText}
      onKeyDown={handleKeyDown}
      placeholder={!inputText ? placeHolderText : ''}
      onIonChange={(e) => handleInputChange(e.detail.value!)}
    ></IonSearchbar>
    <IonButton disabled={!inputText} slot="end" onClick={handleButtonClick}> Search </IonButton>
    </>
  );
};
