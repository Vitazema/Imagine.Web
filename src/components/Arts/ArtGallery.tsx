import React from "react"
import { ArtContext } from "../../context/ArtContext"
import ErrorModule from "../UI/ErrorModule"

import ArtFilter from "./ArtFilter"
import ArtGrid from "./ArtGrid"
import { ApiStatus } from "../Common/ApiStatus"

function ArtGallery() {
  const artContext = React.useContext(ArtContext)
  const [onlyFavourites, setFilter] = React.useState(false)
  const filterChangeHandler = (isFavourites: string) => {
    setFilter(isFavourites === "false" ? false : true)
  }

  const filteredArts = artContext.arts?.filter((art) =>
    onlyFavourites === false ? art : art.favourite === onlyFavourites
  )

  const { status, isSuccess, error } = artContext.getApiStatus()
  
  if (!isSuccess) {
    if (error) {
      <ErrorModule message={error} />
    }
    return <ApiStatus status={status}/>
  }
  
  let content = <></>
  if (filteredArts && filteredArts.length > 0) {
    content = <ArtGrid arts={filteredArts} artsContext={artContext} />
  }
  else {
    content = <h1>"Arts not found."</h1>
  }

  return (
    <section>
      <ArtFilter
        isFavourites={onlyFavourites.toString()}
        onChangeFilter={filterChangeHandler}
      />
      {content}
    </section>
  )
}

export default ArtGallery
