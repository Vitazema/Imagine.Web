import { Art } from "./Art"

export enum Features {
  Flowers,
  Txt2Img 
}

export type ArtRequest = {
  pageIndex: number,
  pageSize: number,
  count: number,
  data: Art[]
}