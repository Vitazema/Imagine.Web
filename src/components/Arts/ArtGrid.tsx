import ArtItem from "./ArtItem"
import React, { useEffect, useState } from "react"
import { Art } from "../../@types/Art"
import { UserContext } from "../../context/UserContext"
import { RequestFilter, useDeleteArt, useGetArts } from "../../context/ArtHooks"
import ErrorModule from "../Common/ErrorModule"
import { ApiStatus } from "../Common/ApiStatus"
import { Container, Grid } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"

const ITEMS_PER_PAGE = 4

type Args = {
  submitted: (art: Art) => void
}

export const ArtGrid = ({ submitted }: Args) => {
  const userContext = React.useContext(UserContext)
  const [arts, setArts] = useState<Art[]>([])
  // const [optimisticArt, setOptimisticArt] = useOptimistic()

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
    userContext.token !== undefined
  )

  const deleteArt = useDeleteArt()

  // Refetch data when user configuration changes
  useEffect(() => {
    if (isSuccess) setArts([])
    refetch()
  }, [userContext.currentUser, userContext.settings])

  useEffect(() => {
    if (isSuccess && data?.pages && data?.pages[0].count > 0) {
      let arts = data.pages.flatMap((page) => page.data)
      setArts(arts)
    }
  }, [data, isSuccess])

  if (isLoading) return <ApiStatus status={status} />
  if (isError) return <ErrorModule message={error.message} />
  if (isSuccess && data.pages.flatMap((page) => page.data).length === 0)
    return <h1>"Arts not found."</h1>

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
          {arts &&
            arts.map((art) => (
              <ArtItem
                key={art.id}
                art={art}
                onCancelPrompt={() => deleteArt.mutate(art.id)}
              />
            ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}
