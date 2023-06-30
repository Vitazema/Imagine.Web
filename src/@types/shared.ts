import { Art } from "./Art"

export const enum Features {
  Flowers = "Flowers",
  Txt2Img = "Txt2Img"
}

export type ArtRequest = {
  pageIndex: number,
  pageSize: number,
  count: number,
  data: Art[]
}