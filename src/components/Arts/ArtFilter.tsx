import { useState } from "react"
import "./ArtFilter.css"

export default function ArtFilter() {
  const [onlyFavourites, setFilter] = useState(false)

  const filterChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const isFavourites = event.target.value
    setFilter(isFavourites === "false" ? false : true)
  }

  return (
    <div className="art-filter">
      <div className="art-filter__control">
        <select
          value={onlyFavourites.toString()}
          onChange={filterChangeHandler}
        >
          <option value="false">all</option>
          <option value="true">favourites</option>
        </select>
      </div>
    </div>
  )
}
