import { ArtStatus } from "../../@types/Art"
import classes from "./ArtItem.module.css"

export default function ProgressBar({ artStatus }: { artStatus: ArtStatus }) {
  if (artStatus.progress === undefined) artStatus.progress = 0
  const progress =
    artStatus.progress > 0 && artStatus.progress <= 1
      ? artStatus.progress * 100
      : artStatus.progress
  return (
    <div className={classes.artProgress}>
      <div
        className={classes.artProgressFill}
        style={{ width: `${progress}%` }}
      >
        <span className={classes.artProgressLabel}>
          {artStatus.progress === 0 || artStatus.progress === 100
            ? artStatus.status
            : progress + "%"}
        </span>
      </div>
    </div>
  )
}
