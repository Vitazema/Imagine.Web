import classes from "./ArtItem.module.css"

interface ProgressBarProps {
  status: string
  progress: number
}

const ProgressBar = ({ status, progress }: ProgressBarProps) => {
  return (
    <div className={classes.artProgress}>
      <div
        className={classes.artProgressFill}
        style={{ width: `${progress}%` }}
      >
        <span className={classes.artProgressLabel}>
          {progress === 0 ? status : progress + "%"}
        </span>
      </div>
    </div>
  )
}
export default ProgressBar
