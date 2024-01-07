import React from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art, ArtStatus } from "../../@types/Art"
import defaultImage from "../../assets/default-image.jpg"
import renderAnimation from "../../assets/rendering.gif"
import { useGetArt, useGetProgress } from "../../hooks/ArtHooks"
import ProgressBar from "./ProgressBar"
import { useQueryClient } from "react-query"

type Args = {
  art: Art
  onCancelPrompt: () => void
  onEdit: () => void
}

const ArtItem: React.FC<Args> = (props) => {
  const createdAt = props.art.createdAt.toString()
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const [artStatus, setProgress] = React.useState<ArtStatus | undefined>()
  const artUnfinished = props.art.urls.length === 0

  const onRecreateHandler = () => {
    // Todo: recreate art
  }

  const { data, status, isSuccess, error } = useGetProgress(
    props.art.id ? props.art.id : "undefined",
    artUnfinished
  )

  React.useEffect(() => {
    if (artUnfinished) {
      if (isSuccess && data) {
        setProgress(data)
        if (data.progress === 100) {
          queryClient.invalidateQueries("arts")
        }
      }
    }
  }, [data, isSuccess])

  return (
    <li className={classes.artItem}>
      <div className={classes.artDate}>
        <div>{createdAt}</div>
      </div>
      <div>
        {props.art.urls.length > 0 ? (
          props.art.urls.map((url, index) => (
            <img
              key={index}
              className={classes.artPreview}
              src={url}
              alt=""
              onClick={() => nav(`/gallery/${props.art.id}`)}
            />
          ))
        ) : (
          <img
            className={classes.artPreview}
            src={renderAnimation}
            alt=""
            onClick={() => nav(`/gallery/${props.art.id}`)}
          />
        )}
      </div>
      <h3>{props.art.title}</h3>
      {isSuccess && data ? (
        <ProgressBar artStatus={data} />
      ) : (
        <div>Undefined status</div>
      )}

      <button onClick={onRecreateHandler}>Recreate</button>
      <Link className="btn btn-primary w-100" to={`/gallery/${props.art.id}`}>
        Edit
      </Link>
      <button
        className="btn btn-danger w-100"
        onClick={() => {
          props.onCancelPrompt()
        }}
      >
        Cancel
      </button>
    </li>
  )
}
export default ArtItem
