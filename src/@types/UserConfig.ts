import { AiTypes } from "./shared"

export class UserConfig {
  userId?: string
  selectedFeature: AiTypes = AiTypes.Txt2Img
  isFavorite?: boolean
  
  constructor(init?: Partial<UserConfig>) {
    Object.assign(this, init)    
  }
}

export const features = [AiTypes.Txt2Img, AiTypes.Flowers]