import classes from "./ArtGallery.module.css";
import ArtItem from "./ArtItem";
import { IArtDbContext } from "../../@types/context";
import { ArtContext } from "../../context/ArtContext";
import React from "react";
import { Art } from "../../@types/Art";

function ArtGrid(props: {arts: Art[], artsContext: IArtDbContext}) {
  const artContext = React.useContext(ArtContext)
  return (
    <ul className={classes.arts}>
      {props.arts.map((art) => (
        <ArtItem
          key={art.id}
          title={art.title}
          progress={art.progress}
          createdAt={art.createdAt}
          onCancelPrompt={artContext.cancelArt.bind(null, art.id)}
        />
      ))}
    </ul>
  );
}

export default ArtGrid;
