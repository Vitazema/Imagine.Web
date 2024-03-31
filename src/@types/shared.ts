import { Art } from "./Art"

export enum AiTypes {
  Txt2Img,
  Flowers,
}

export enum Languages {
  En,
  Ru,
}

export type ArtRequest = {
  pageIndex: number
  pageSize: number
  count: number
  data: Art[]
}
