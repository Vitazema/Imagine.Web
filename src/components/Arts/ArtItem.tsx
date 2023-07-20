import React from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art } from "../../@types/Art"
import { defaultImage } from "../../config"

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
    setProgress(0)
  }

  return (
    <li className={classes.artItem}>
      <div className={classes.artDate}>
        <div>{createdAt}</div>
      </div>
      <div>
        <img 
          className="img-fluid"
          src={props.art.url ? props.art.url : defaultImage}
          alt=""
          width="200"
          height="100"
          onClick={() => nav(`/gallery/${props.art.id}`)}
        />
      </div>
      <h3>{props.art.title}</h3>
      <div className={classes.artProgress}>
        <p>Progress: {progress}</p>
      </div>
      <button onClick={onRecreateHandler}>Recreate</button>
      <Link className="btn btn-primary w-100" to={`/gallery/${props.art.id}`}>
        Edit
      </Link>
      <button
        className="btn btn-danger w-100"
        onClick={() => {
          if (window.confirm("Are you sure?")) props.onCancelPrompt()
        }}
      >
        Cancel
      </button>
    </li>
  )
}
export default ArtItem
