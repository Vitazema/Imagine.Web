import { AiTypes } from "./shared"

export class Art {
  id: string | undefined
  title?: string | undefined
  progress: number
  createdAt: Date
  urls: string[]
  favourite: boolean
  artType: AiTypes
  user?: string
  artSetting: ArtSettings

  constructor(
    id: string | undefined,
    artType: AiTypes,
    artSetting: ArtSettings,
    title: string | undefined,
    favourite: boolean
  ) {
    this.id = id
    this.title = title
    this.progress = 0
    this.urls = []
    this.favourite = favourite
    this.createdAt = new Date()
    this.artType = artType
    this.artSetting = artSetting
  }
}

export class ArtSettings {
  prompt: string
  negativePrompt: string | undefined
  amount: number
  image: string | undefined

  constructor(prompt: string, amount: number) {
    this.prompt = prompt
    this.amount = amount
  }
}
