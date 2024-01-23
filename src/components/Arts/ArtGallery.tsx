import React, { useEffect } from "react"
import { ArtContext } from "../../context/ArtContext"
import ErrorModule from "../Common/ErrorModule"

import ArtFilter from "./ArtFilter"
import ArtGrid from "./ArtGrid"
import { ApiStatus, Status } from "../Common/ApiStatus"
import { Art } from "../../@types/Art"
import { UserContext } from "../../context/UserContext"
import { RequestFilter, useGetArts } from "../../context/ArtHooks"

function ArtGallery() {
  const artContext = React.useContext(ArtContext)
  const userContext = React.useContext(UserContext)
  const [onlyFavourites, setFilter] = React.useState(false)
  const filterChangeHandler = (isFavourites: string) => {
    setFilter(isFavourites === "false" ? false : true)
  }

  let content = <></>
  const request = useGetArts(new RequestFilter(userContext.settings.selectedFeature))
  
  // useEffect(() => {
  //   if (request.isSuccess) {
  //     artContext.setArts(request.data?.data as Art[])
  //   }
  // }, [request, userContext.config.selectedFeature, onlyFavourites, userContext.currentUser?.userName])

  if (!request) {
    content = <ErrorModule message="Error while fetching arts." />
  }

  if (request.error) {
    content = <ErrorModule message={request.error.message} />
  }

  if (request.isSuccess) {
    const filteredArts = artContext.arts?.filter((art) =>
      onlyFavourites === false ? art : art.favourite === onlyFavourites
    )

    if (filteredArts && filteredArts.length > 0) {
      content = <ArtGrid />
    } else {
      content = <h1>"Arts not found."</h1>
    }
  } else {
    content = <ApiStatus status={request.status as Status} />
  }
  // }, [request, artContext.aiType, onlyFavourites, authContext.isLoggedIn])

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
