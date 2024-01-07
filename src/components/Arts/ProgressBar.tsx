import { ArtStatus } from "../../@types/Art"
import classes from "./ArtItem.module.css"

interface ArtStatusProps {
  artStatus: ArtStatus
}

const ProgressBar: React.FC<ArtStatusProps> = ({artStatus}) => {
  const progress = artStatus.progress > 0 && artStatus.progress <= 1 ? artStatus.progress * 100 : artStatus.progress
  return (
    <div className={classes.artProgress}>
      <div
        className={classes.artProgressFill}
        style={{ width: `${progress}%` }}
      >
        <span className={classes.artProgressLabel}>
          {artStatus.progress === 0 || artStatus.progress === 100 ? artStatus.status : progress  + "%"}
        </span>
      </div>
    </div>
  )
}
export default ProgressBar
