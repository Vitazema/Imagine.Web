import classes from "./ArtGallery.module.css"
import ArtItem from "./ArtItem"
import { IArtDbContext } from "../../@types/context"
import { ArtContext } from "../../context/ArtContext"
import React from "react"
import { Art } from "../../@types/Art"
import { UserContext } from "../../context/UserContext"
import { RequestFilter, useGetArts } from "../../context/ArtHooks"
import ErrorModule from "../Common/ErrorModule"
import { ApiStatus, Status } from "../Common/ApiStatus"
import { Container, Grid } from "@mui/material"

const ITEMS_PER_PAGE = 5

function ArtGrid() {
  const userContext = React.useContext(UserContext)
  const artContext = React.useContext(ArtContext)
  let content

  const { data, isSuccess, isLoading, isError, error, refetch, status } =
    useGetArts(
      new RequestFilter(userContext.config.selectedFeature),
      userContext.currentUser !== undefined
    )

  if (isError) {
    content = <ErrorModule message={error.message} />
  }

  if (isSuccess) {
    if (data?.data?.length > 0) {
      content = data.data?.map((art) => (
        <ArtItem
          key={art.id}
          art={art}
          onCancelPrompt={artContext.cancelArt.bind(null, art)}
          onEdit={artContext.editArt.bind(null, art)}
        />
      ))
    } else {
      content = <h1>"Arts not found."</h1>
    }
  } else {
    content = <ApiStatus status={status as Status} />
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
      <ul className={classes.arts}>
        {content}        
      </ul>
      </Grid>
    </Container>
  )
}

export default ArtGrid
