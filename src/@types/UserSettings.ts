import { AiTypes, Languages } from "./shared"

export class UserSettings {
  language: Languages = Languages.En
  selectedFeature: AiTypes = AiTypes.Txt2Img
  
  constructor(init?: Partial<UserSettings>) {
    Object.assign(this, init)    
  }
}

export const features = [AiTypes.Txt2Img, AiTypes.Flowers]