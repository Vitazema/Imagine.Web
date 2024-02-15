import React, { useState } from "react"
import classes from "./ArtItem.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Art, ArtStatus } from "../../@types/Art"
import renderAnimation from "../../assets/rendering.gif"
import { useGetProgress } from "../../context/ArtHooks"
import ProgressBar from "./ProgressBar"
import { useQueryClient } from "react-query"
import { Button, FormGroup, IconButton, Paper } from "@mui/material"
import {
  Favorite,
  Close,
  Info as InfoIcon,
  FavoriteBorder,
} from "@mui/icons-material"
import FeedbackRating from "./FeedbackRating"

type Args = {
  art: Art
  onCancel: () => void
  onFavorite: () => void
}

export default function ArtItem({ art, onCancel, onFavorite }: Args) {
  const [expanded, setExpanded] = useState(true)
  const [rating, setRating] = useState<number | undefined>()
  const createdAt = art.createdAt.toString()
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const [artStatus, setProgress] = React.useState<ArtStatus | undefined>()
  const artUnfinished = art.urls.length === 0

  const onRecreateHandler = () => {
    // Todo: recreate art
  }

  const expandInfoHandler = () => {
    setExpanded(!expanded)
  }

  const rateHandler = (index: number) => {
    setRating(index)
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
      <Paper>
        <IconButton onClick={expandInfoHandler}>
          <InfoIcon />
        </IconButton>
        <IconButton onClick={() => onFavorite()}>
          {art.favourite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Button onClick={onRecreateHandler}>Recreate</Button>
        <Button>
          <Link to={`/gallery/${art.id}`}>Edit</Link>
        </Button>
        <Button className="btn btn-danger w-100" onClick={onCancel}>
          <Close />
        </Button>
        <Info expanded={expanded} art={art}>
          {isSuccess && data ? (
            <ProgressBar artStatus={data} />
          ) : (
            <div>Undefined status</div>
          )}
        </Info>
        <FeedbackRating initialRating={art.rating} onRate={rateHandler} />
      </Paper>
    </li>
  )
}

function Info({
  expanded,
  art,
  children,
}: {
  expanded: boolean
  art: Art
  children: React.ReactNode
}) {
  return (
    <>
      {expanded && (
        <div>
          {/* <span className={classes.artDate}>{createdAt}</span> */}
          <h3>{art.title}</h3>
        </div>
      )}
      {children}
    </>
  )
}
