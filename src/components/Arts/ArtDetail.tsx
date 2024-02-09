import { useParams } from "react-router-dom"
import ErrorModule from "../Common/ErrorModule"
import React from "react"
import { ApiStatus, Status } from "../Common/ApiStatus"
import { dateFormatter } from "../../utils/DateFormatter"
import defaultImage from "../../assets/default-image.jpg"
import { useGetArt } from "../../context/ArtHooks"

const ArtDetail = () => {
  const { id } = useParams()
  const artId = id ? id : "none"
  const { data, status, isSuccess, error } = useGetArt(artId)

  if (!artId) {
    return <ErrorModule message={`Invalid id: ${id}`} />
  }

  if (!isSuccess) {
    if (error) {
      ;<ErrorModule message={error.message} />
    }
    return <ApiStatus status={status as Status} />
  }

  if (!data) return <ErrorModule message="Art not found" />

  function nav(arg0: string): void {
    throw new Error("Function not implemented.")
  }

  return (
    <section>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {data.urls.length > 0 ? (
              data.urls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt=""
                />
              ))
            ) : (
              <img
                src={defaultImage}
                alt=""
              />
            )}
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
            <div className="col-12 mt-3">{data.artSetting?.prompt}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtDetail
