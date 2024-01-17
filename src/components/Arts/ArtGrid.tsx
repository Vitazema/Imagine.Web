import classes from "./ArtGallery.module.css";
import ArtItem from "./ArtItem";
import { IArtDbContext } from "../../@types/context";
import { ArtContext } from "../../context/ArtContext";
import React from "react";
import { Art } from "../../@types/Art";

const ITEMS_PER_PAGE = 5

function ArtGrid(props: {arts: Art[], artsContext: IArtDbContext}) {
  const artContext = React.useContext(ArtContext)
  return (
    <ul className={classes.arts}>
      {props.arts.map((art) => (
        <ArtItem
          key={art.id}
          art={art}
          onCancelPrompt={artContext.cancelArt.bind(null, art)}
          onEdit={artContext.editArt.bind(null, art)}
        />
      ))}
    </ul>
  );
}

export default ArtGrid;
