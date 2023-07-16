import { useParams } from "react-router-dom"
import ErrorModule from "../UI/ErrorModule"
import { useEditArt, useGetArt } from "../../context/ArtHooks"
import { ApiStatus, Status } from "../Common/ApiStatus"
import ArtDetail from "../ArtDetail/ArtDetail"

const ArtEdit = () => {
  const { id } = useParams()

  if (!id) {
    return <ErrorModule message="Invalid id" />
  }

  const artId = parseInt(id)

  const { data, status, isSuccess, error } = useGetArt(artId)

  const updateHouseMutation = useEditArt()

  if (!isSuccess) return <ApiStatus status={status as Status} />

  return (
    <ArtDetail art={data} submitted={(a) => updateHouseMutation.mutate(a)} />
  )
}
