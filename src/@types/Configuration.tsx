import { Parameters } from "./Art"
import { AiTypes } from "./shared"

export interface Configuration {
  aiType: AiTypes
  jsonConfig: string
}

export class Txt2ImgConfig implements Configuration {
  public aiType: AiTypes = AiTypes.Txt2Img
  constructor(
    public jsonConfig: string,
    public configuration: Parameters,
    public isFavorite: boolean
  ) {}
}
