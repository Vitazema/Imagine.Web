import { useState } from "react"
import { Art } from "../../@types/Art"
import FeedbackRating from "./FeedbackRating"
import { dateFormatter } from "../../utils/DateFormatter"
import { useRateArt } from "../../context/ArtHooks"

export function ArtInfo({
  expanded,
  art,
  children,
}: {
  expanded: boolean
  art: Art
  children: React.ReactNode
}) {
  const [rating, setRating] = useState<number | undefined>(art.rating)
  const rate = useRateArt()
  const rateHandler = (index: number) => {
    setRating(index)
    art.rating = index
    rate.mutate(art)
  }

  return (
    <>
      {expanded ? (
        <div>
          <h3>{art.title}</h3>
          <span>{dateFormatter.format(new Date(art.createdAt))}</span>
          <FeedbackRating initialRating={rating} onRate={rateHandler} />
        </div>
      ) : null}
      {/* <div className="col-6">
          <div className="row mt-2">
            <h5 className="col-12">{artData.title}</h5>
          </div>
          <div className="row">
            <h3 className="col-12">
              {dateFormatter.format(new Date(artData.createdAt))}
            </h3>
          </div>
          <div className="row">
            <div className="col-12 mt-3">{artData.parameters?.prompt}</div>
          </div>
        </div> */}
      {children}
    </>
  )
}
