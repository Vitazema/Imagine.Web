import React from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art } from "../../@types/Art"
import { defaultImage } from "../../config"
import ProgressBar from "./ProgressBar"

type Args = {
  art: Art
  onCancelPrompt: () => void
  onEdit: () => void
}

const ArtItem: React.FC<Args> = (props) => {
  const createdAt = props.art.createdAt.toString()
  const nav = useNavigate()
  const [progress, setProgress] = React.useState(props.art.progress)

  const onRecreateHandler = () => {
    setProgress(Math.floor(Math.random() * 101))
  }

  return (
    <li className={classes.artItem}>
      <div className={classes.artDate}>
        <div>{createdAt}</div>
      </div>
      <div>
        { props.art.urls.length > 0 ?
        props.art.urls.map((url, index) => (
          <img
            key={index}
            className={classes.artPreview}
            src={url}
            alt=""
            onClick={() => nav(`/gallery/${props.art.id}`)}
          />
        )) : (
          <img
          className={classes.artPreview}
          src={defaultImage}
          alt=""
          onClick={() => nav(`/gallery/${props.art.id}`)}
        />
        )}
      </div>
      <h3>{props.art.title}</h3>
      {progress !== 100 && (
        <ProgressBar
          status={progress === 0 ? "starting" : "loading"}
          progress={progress}
        />
      )}
      <button onClick={onRecreateHandler}>Recreate</button>
      <Link className="btn btn-primary w-100" to={`/gallery/${props.art.id}`}>
        Edit
      </Link>
      <button
        className="btn btn-danger w-100"
        onClick={() => {
          // if (window.confirm("Are you sure?"))
          props.onCancelPrompt()
        }}
      >
        Cancel
      </button>
    </li>
  )
}
export default ArtItem
