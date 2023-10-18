import { Art } from "./Art"

export enum AiTypes {
  Flowers,
  Txt2Img 
}

export type ArtRequest = {
  pageIndex: number,
  pageSize: number,
  count: number,
  data: Art[]
}