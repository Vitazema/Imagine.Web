import ArtItem from "./ArtItem"
import { Art } from "../../@types/Art"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState } from "react"
import { Box, Container, Modal } from "@mui/material"
import ArtDetail from "./ArtDetail"
import classes from "./ArtGrid.module.css"

type Args = {
  arts: Art[]
  fetchNextPage: any
  hasNextPage: boolean | undefined
  onDeleteArt: (id: string) => void
  onFavorite: (id: string) => void
}

export const ArtGrid = ({
  arts,
  fetchNextPage,
  hasNextPage,
  onDeleteArt,
  onFavorite,
}: Args) => {
  const [selectedArt, setSelectedArt] = useState<Art>()
  if (arts.length === 0) return <h1>"Arts not found."</h1>

  return (
    <>
      <Modal
        open={!!selectedArt}
        onClose={() => setSelectedArt(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
            }}
          >
            <ArtDetail art={selectedArt} />
          </Box>
        </Container>
      </Modal>
      <div className={classes.grid}>
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<h4>Loading...</h4>}
          dataLength={arts.length || 0}
        >
          <ul>
            {arts.map((art) => (
              <ArtItem
                key={art.id}
                art={art}
                onCancel={() => onDeleteArt(art.id)}
                onFavorite={() => onFavorite(art.id)}
                onSelect={() => setSelectedArt(art)}
              />
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </>
  )
}
