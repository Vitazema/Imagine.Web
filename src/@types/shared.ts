import { Art } from "./Art"

export enum AiTypes {
  Txt2Img,
  Flowers
}

export type ArtRequest = {
  pageIndex: number,
  pageSize: number,
  count: number,
  data: Art[]
}