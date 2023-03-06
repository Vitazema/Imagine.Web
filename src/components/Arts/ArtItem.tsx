import React from "react";
import classes from "./ArtItem.module.css";

const ArtItem: React.FC<{
  title: string
  progress: number
  createdAt: Date
  onCancelPrompt: () => void
}> = (props) => {
  const createdAt = props.createdAt.toLocaleDateString();

  const [progress, setProgress] = React.useState(props.progress)  

  const onRecreateHandler = () => {
    setProgress(0)
  }

  return (
    <li className={classes.artItem}>
      <div className={classes.artDate}>
        <div>{createdAt}</div>
      </div>
      {props.title}
      <div className={classes.artProgress}>Progress: {progress}</div>
      <button onClick={onRecreateHandler} className={classes.artCancel}>Recreate</button>
      <button onClick={props.onCancelPrompt} className={classes.artCancel}>
        Cancel
      </button>
    </li>
  );
};
export default ArtItem;
