import classes from "./ArtGallery.module.css";
import Art from "../../models/Art";
import ArtItem from "./ArtItem";
import { ArtsContextType } from "../../@types/shared";

function ArtGrid(props: {arts: Art[], artsContext: ArtsContextType}) {
  
  if (props.arts.length === 0) return <p>Arts not found.</p>;

  return (
    <ul className={classes.arts}>
      {props.arts.map((art) => (
        <ArtItem
          key={art.id}
          title={art.title}
          progress={art.progress}
          createdAt={art.createdAt}
          onCancelPrompt={props.artsContext.cancelArt.bind(null, art.id)}
        />
      ))}
    </ul>
  );
}

export default ArtGrid;
