import classes from "./ArtGallery.module.css"
import ArtItem from "./ArtItem"
import { IArtDbContext } from "../../@types/context"
import { ArtContext } from "../../context/ArtContext"
import React, { useEffect } from "react"
import { Art } from "../../@types/Art"
import { UserContext } from "../../context/UserContext"
import { RequestFilter, useGetArts } from "../../context/ArtHooks"
import ErrorModule from "../Common/ErrorModule"
import { ApiStatus, Status } from "../Common/ApiStatus"
import { Container, Grid } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"

const ITEMS_PER_PAGE = 4

function ArtGrid() {
  const userContext = React.useContext(UserContext)
  const artContext = React.useContext(ArtContext)
  let content

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetArts(
    new RequestFilter(userContext.settings.selectedFeature, ITEMS_PER_PAGE),
    userContext.currentUser !== undefined
  )

  // Refetch data when user configuration changes
  useEffect(() => {
    if (isSuccess)
      refetch()
  }, [userContext.currentUser, userContext.settings])

  if (isError) {
    content = <ErrorModule message={error.message} />
  }

  if (isSuccess) {
    if (data?.pages && data?.pages[0].count > 0) {
      content = data.pages?.map((page) =>
        page.data.map((art) => (
          <ArtItem
            key={art.id}
            art={art}
            onCancelPrompt={artContext.cancelArt.bind(null, art)}
            onEdit={artContext.editArt.bind(null, art)}
          />
        ))
      )
    } else {
      content = <h1>"Arts not found."</h1>
    }
  } else {
    content = <ApiStatus status={status as Status} />
  }

  return (
    <Container maxWidth="lg">
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading...</h4>}
        dataLength={
          data?.pages.reduce((total, page) => total + page.data.length, 0) || 0
        }
      >
      <Grid container spacing={1}>
        <ul className={classes.arts}>{content}</ul>
      </Grid>
      </InfiniteScroll>
    </Container>
  )
}

export default ArtGrid
