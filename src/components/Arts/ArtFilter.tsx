import { useState } from "react"
import "./ArtFilter.css"
import {
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
} from "@mui/material"
import {
  ViewComfy,
  Favorite,
  DeleteForever,
  Undo,
  Redo,
} from "@mui/icons-material"

export default function ArtFilter() {
  const [onlyFavourites, setFilter] = useState(false)

  const filterChangeHandler = (e: any) => {
    const isFavourites = e.target.value
    setFilter(!isFavourites)
  }

  const deleteAllArtsHandler = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all arts?"
    )
    if (confirmed) {
      // todo: delete all arts
    }
  }

  return (
    <div className="art-filter">
      <div className="art-filter__control">
        <FormGroup aria-label="position" row>
          <Button>Create</Button>
          <Button>Advanced</Button>
          <IconButton>
            <Undo />
          </IconButton>
          <IconButton>
            <Redo />
          </IconButton>
          <IconButton onClick={deleteAllArtsHandler}>
            <DeleteForever />
          </IconButton>
          <IconButton>
            <ViewComfy />
          </IconButton>
          <FormControlLabel
            control={
              <Switch value={onlyFavourites} onChange={filterChangeHandler} />
            }
            label={<Favorite />}
            labelPlacement="start"
          />
        </FormGroup>
      </div>
    </div>
  )
}
