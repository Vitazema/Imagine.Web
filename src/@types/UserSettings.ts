import { AiTypes } from "./shared"

export class UserSettings {
  selectedFeature: AiTypes = AiTypes.Txt2Img
  
  constructor(init?: Partial<UserSettings>) {
    Object.assign(this, init)    
  }
}

export const features = [AiTypes.Txt2Img, AiTypes.Flowers]