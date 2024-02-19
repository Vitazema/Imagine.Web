import { useParams } from "react-router-dom"
import ErrorModule from "../Common/ErrorModule"
import { ApiStatus, Status } from "../Common/ApiStatus"
import defaultImage from "../../assets/default-image.jpg"
import { useGetArt } from "../../context/ArtHooks"
import { Art } from "../../@types/Art"
import { ArtInfo } from "./ArtInfo"

const ArtDetail = ({ art }: { art?: Art }) => {
  const { id } = useParams()
  const { data, status, isSuccess, error } = useGetArt(id)

  let artData = data

  if (!id && !art) {
    return <ErrorModule message={`Invalid id: ${id}`} />
  }

  if (!id && art) {
    artData = art
  }

  if (id && !isSuccess) {
    if (error) return <ErrorModule message={error.message} />
    return <ApiStatus status={status as Status} />
  }

  if (!artData) return <ErrorModule message="Art not found" />

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          {artData.urls.length > 0 ? (
            artData.urls.map((url, index) => (
              <img key={index} src={url} alt="" />
            ))
          ) : (
            <img src={defaultImage} alt="" />
          )}
        </div>
      </div>
      {id ? (
        <ArtInfo expanded={true} art={artData}>
          {null}
        </ArtInfo>
      ) : null}
    </div>
  )
}

export default ArtDetail
