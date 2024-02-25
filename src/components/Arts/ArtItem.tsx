import React, { useState } from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art, ArtStatus } from "../../@types/Art"
import renderAnimation from "../../assets/rendering.gif"
import { useGetProgress } from "../../context/ArtHooks"
import ProgressBar from "./ProgressBar"
import { useQueryClient } from "react-query"
import { Button, IconButton, Paper } from "@mui/material"
import {
  Favorite,
  Close,
  Info as InfoIcon,
  FavoriteBorder,
} from "@mui/icons-material"
import FeedbackRating from "./FeedbackRating"
import { ArtInfo } from "./ArtInfo"

type Args = {
  art: Art
  onCancel: () => void
  onFavorite: () => void
  onSelect: () => void
}

export default function ArtItem({ art, onCancel, onFavorite, onSelect }: Args) {
  const [expanded, setExpanded] = useState(true)
  const createdAt = art.createdAt.toString()
  const queryClient = useQueryClient()
  const [artStatus, setProgress] = React.useState<ArtStatus | undefined>()
  const artUnfinished = art.urls.length === 0

  const onRecreateHandler = () => {
    // Todo: recreate art
  }

  const expandInfoHandler = () => {
    setExpanded(!expanded)
  }

  const { data, status, isSuccess, error } = useGetProgress(
    art.id ? art.id : "undefined",
    artUnfinished
  )

  React.useEffect(() => {
    if (artUnfinished) {
      if (isSuccess && data) {
        setProgress(data)
        if (data.completed === true) {
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
              onClick={onSelect}
            />
          ))
        )}
      </div>
      <Paper>
        <IconButton onClick={expandInfoHandler}>
          <InfoIcon />
        </IconButton>
        <IconButton onClick={() => onFavorite()}>
          {art.favorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Button onClick={onRecreateHandler}>Recreate</Button>
        <Button>
          <Link to={`/gallery/${art.id}`}>Edit</Link>
        </Button>
        <Button className="btn btn-danger w-100" onClick={onCancel}>
          <Close />
        </Button>
        <ArtInfo key={art.id} expanded={expanded} art={art}>
          {isSuccess && data ? (
            <ProgressBar artStatus={data} />
          ) : (
            <div>Undefined status</div>
          )}
        </ArtInfo>
      </Paper>
    </li>
  )
}
