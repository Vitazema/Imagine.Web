import { useParams } from "react-router-dom"
import ErrorModule from "../UI/ErrorModule"
import React from "react"
import { ArtContext } from "../../context/ArtContext"
import { Art } from "../../@types/Art"
import { ApiStatus, Status } from "../Common/ApiStatus"
import { useGetArt } from "../../context/ArtHooks"
import { dateFormatter } from "../../utils/DateFormatter"
import { defaultImage } from "../../config"

type Args = {
  art: Art | undefined
  submitted: (art: Art) => void
}

const ArtDetail = ({art, submitted} : Args) => {
  const artContext = React.useContext(ArtContext)
  const { id } = useParams()
  const artId = id ? parseInt(id) : 0
  const { data, status, isSuccess, error } = useGetArt(artId)
  if (!id) {
    return <ErrorModule message="Invalid id" />
  }

  if (!isSuccess) {
    if (error) {
      <ErrorModule message={error.message} />
    }
    return <ApiStatus status={status as Status} />
  }

  if (!data) return <ErrorModule message="Art not found" />

  return (
    <section>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <img
              className="img-fluid"
              src={data.url ? data.url : defaultImage}
              alt="Your art"
            />
          </div>
          {/* <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/house/edit/${data.id}`}
            >
              Edit
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("Are you sure?"))
                  deleteHouseMutation.mutate(data);
              }}
            >
              Delete
            </button>
          </div>
        </div> */}
        </div>
        <div className="col-6">
          <div className="row mt-2">
            <h5 className="col-12">{data.title}</h5>
          </div>
          <div className="row">
            <h3 className="col-12">
              {dateFormatter.format(new Date(data.createdAt))}
            </h3>
          </div>
          <div className="row">
            <div className="col-12 mt-3">{data.settings?.textPrompt}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtDetail
