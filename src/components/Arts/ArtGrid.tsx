import ArtItem from "./ArtItem"
import { Art } from "../../@types/Art"
import InfiniteScroll from "react-infinite-scroll-component"

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
  if (arts.length === 0) return <h1>"Arts not found."</h1>

  return (
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
          />
        ))}
      </ul>
    </InfiniteScroll>
  )
}
