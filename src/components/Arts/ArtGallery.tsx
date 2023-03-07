import React from "react";
import { ArtContext } from "../../context/ArtContext";

import ArtFilter from "./ArtFilter";
import ArtGrid from "./ArtGrid";

const ArtGallery: React.FC = () => {
  const artsContext = React.useContext(ArtContext);
  const [onlyFavourites, setFilter] = React.useState(false);
  const filterChangeHandler = (isFavourites: string) => {
    setFilter(isFavourites === "false" ? false : true);
  };

  const filteredArts = artsContext?.arts.filter((art) =>
    onlyFavourites === false ? art : art.favourite === onlyFavourites
  );

  return (
    <>
      <ArtFilter
        isFavourites={onlyFavourites.toString()}
        onChangeFilter={filterChangeHandler}
      />
      <ArtGrid arts={filteredArts} artsContext={artsContext}></ArtGrid>
    </>
  );
};

export default ArtGallery;
