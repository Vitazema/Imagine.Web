import React, { useEffect } from "react";
import { ArtContext } from "../../context/ArtContext";
import ErrorModule from "../UI/ErrorModule";

import ArtFilter from "./ArtFilter";
import ArtGrid from "./ArtGrid";

function ArtGallery() {
  const artContext = React.useContext(ArtContext);
  const [onlyFavourites, setFilter] = React.useState(false);
  const filterChangeHandler = (isFavourites: string) => {
    setFilter(isFavourites === "false" ? false : true);
  };

  const filteredArts = artContext?.arts.filter((art) =>
    onlyFavourites === false ? art : art.favourite === onlyFavourites
  );

  let content = <ErrorModule message="Arts not found."/>

  if (filteredArts.length > 0){
    content = <ArtGrid arts={filteredArts} artsContext={artContext}/>
  }

  if (artContext.error){
    content = <ErrorModule message={artContext.error}/>
  }

  if (artContext.isLoading){
    content = <p>Loading...</p>
  }

  return (
    <>
      <ArtFilter
        isFavourites={onlyFavourites.toString()}
        onChangeFilter={filterChangeHandler}
      />
      {content}
    </>
  );
};

export default ArtGallery;
