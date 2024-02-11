import React, { useState } from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art, ArtStatus } from "../../@types/Art"
import renderAnimation from "../../assets/rendering.gif"
import { useGetProgress } from "../../context/ArtHooks"
import ProgressBar from "./ProgressBar"
import { useQueryClient } from "react-query"
import { Button, IconButton } from "@mui/material"
import { Favorite, Close } from "@mui/icons-material"

type Args = {
  art: Art
  onCancel: () => void
  onFavorite: () => void
}

export default function ArtItem({ art, onCancel, onFavorite }: Args) {
  const createdAt = art.createdAt.toString()
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const [artStatus, setProgress] = React.useState<ArtStatus | undefined>()
  const artUnfinished = art.urls.length === 0

  const onRecreateHandler = () => {
    // Todo: recreate art
  }

  const { data, status, isSuccess, error } = useGetProgress(
    art.id ? art.id : "undefined",
    artUnfinished
  )

  React.useEffect(() => {
    if (artUnfinished) {
      if (isSuccess && data) {
        setProgress(data)
        if (data.progress === 100) {
          queryClient.invalidateQueries("arts")
        }
      }
    }
  }, [data, isSuccess])

  return (
    <li style={{ opacity: artUnfinished ? 0.5 : 1 }}>
      <div>
        {artUnfinished ? (
          <img className={classes.artPreview} src={renderAnimation} />
        ) : (
          art.urls.map((url, index) => (
            <img
              key={index}
              className={classes.artPreview}
              src={url}
              alt=""
              onClick={() => nav(`/gallery/${art.id}`)}
            />
          ))
        )}
      </div>
      <h3>{art.title}</h3>
      {/* <span className={classes.artDate}>{createdAt}</span> */}
      {isSuccess && data ? (
        <ProgressBar artStatus={data} />
      ) : (
        <div>Undefined status</div>
      )}
      <IconButton onClick={() => onFavorite()}>
        <Favorite color={art.favourite ? "error" : "inherit"} />
      </IconButton>
      <Button onClick={onRecreateHandler}>Recreate</Button>
      <Link className="btn btn-primary w-100" to={`/gallery/${art.id}`}>
        Edit
      </Link>
      <Button className="btn btn-danger w-100" onClick={onCancel}>
        <Close />
      </Button>
    </li>
  )
}
