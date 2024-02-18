import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { RequestFilter, useDeleteArt, useGetArts } from "../../context/ArtHooks"
import { Art } from "../../@types/Art"
import { Container, Paper } from "@mui/material"
import ArtFilter from "./ArtFilter"
import { ApiStatus } from "../Common/ApiStatus"
import ErrorModule from "../Common/ErrorModule"
import { ArtGrid } from "./ArtGrid"
import Txt2Img from "../Features/Txt2img"

const ITEMS_PER_PAGE = 4

export default function Creator() {
  const userContext = useContext(UserContext)
  const [arts, setArts] = useState<Art[]>()
  // const [optimisticArt, setOptimisticArt] = useOptimistic()

  const deleteArt = useDeleteArt()

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
    !!userContext.token
  )

  function addArtHandler(art: Art) {
    setArts((arts) => {
      if (arts) return [art, ...arts]
    })
  }

  const onDeleteArt = async (id: string) => {
    setArts((arts) => arts?.filter((a) => a.id !== id))
    await deleteArt.mutateAsync(id)
  }

  const onChangeFavourite = async (id: string) => {
    setArts((arts) =>
      arts?.map((art) =>
        art.id === id ? { ...art, favourite: !art.favourite } : art
      )
    )
  }

  // Refetch data when user configuration changes
  useEffect(() => {
    if (isSuccess && userContext.token && userContext.settings) {
      refetch()
    }
  }, [userContext.token, userContext.settings.selectedFeature])

  useEffect(() => {
    if (isSuccess && data) {
      setArts(data.pages.flatMap((page) => page.data))
    }
  }, [isSuccess, data])

  let content

  if (isLoading) content = <ApiStatus status={status} />
  if (isError) content = <ErrorModule message={error.message} />
  if (isSuccess && data && arts)
    content = (
      <ArtGrid
        arts={arts}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        onDeleteArt={onDeleteArt}
        onFavorite={onChangeFavourite}
      />
    )

  return (
    <Container maxWidth="md">
      <Txt2Img onAddArt={addArtHandler} />
      <Paper>
        <ArtFilter />
      </Paper>
      {content}
    </Container>
  )
}
