import React from "react"
import classes from "./ArtItem.module.css"

const ArtItem: React.FC<{
  title: string
  progress: number
  createdAt: Date
  onCancelPrompt: () => void
}> = (props) => {
  const createdAt = props.createdAt.toLocaleDateString()

  const [progress, setProgress] = React.useState(props.progress)

  const onRecreateHandler = () => {
    setProgress(0)
  }

  return (
    <li className={classes.artItem}>
      <div className={classes.artDate}>
        <div>{createdAt}</div>
      </div>
      <h3>{props.title}</h3>
      <div className={classes.artProgress}>
        <p>Progress: {progress}</p>
      </div>
      <button onClick={onRecreateHandler}>
        Recreate
      </button>
      <button onClick={props.onCancelPrompt}>
        Cancel
      </button>
    </li>
  )
}
export default ArtItem
