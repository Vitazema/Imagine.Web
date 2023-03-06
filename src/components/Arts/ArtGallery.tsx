import React from "react";
import { ArtsContext } from "../../context/ArtsContext";
import ArtItem from "./ArtItem";

import classes from "./ArtGallery.module.css";
import ArtFilter from "./ArtFilter";

const ArtGallery: React.FC = () => {
  const artsContext = React.useContext(ArtsContext);
  const [isFavourites, setFilter] = React.useState(false)
  const filterChangeHandler = (isFavourites: boolean ) => {
    setFilter(isFavourites)
    console.log(isFavourites)
  }

  return (
    <div>
      <ArtFilter isFavourites={isFavourites} onChangeFilter={filterChangeHandler}/>
      <ul className={classes.arts}>
        {artsContext?.arts.map((art) => (
          <ArtItem
            key={art.id}
            title={art.title}
            progress={art.progress}
            createdAt={art.createdAt}
            onCancelPrompt={artsContext.cancelArt.bind(null, art.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArtGallery;
