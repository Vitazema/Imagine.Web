import { ArtStatus } from "../../@types/Art"
import classes from "./ArtItem.module.css"

export default function ProgressBar({ artStatus }: { artStatus: ArtStatus }) {
  const progress =
    artStatus.progress && artStatus.progress >= 0 && artStatus.progress <= 1
      ? Math.floor(artStatus.progress * 100)
      : artStatus.progress
  return (
    <div className={classes.artProgress}>
      <div
        className={classes.artProgressFill}
        style={{ width: `${progress}%` }}
      >
        <span className={classes.artProgressLabel}>
          {artStatus.completed || progress === 0
            ? artStatus.status
            : progress + "%"}
        </span>
      </div>
    </div>
  )
}
