import { Features } from "./shared"

export class Art {
  id: number
  title?: string | undefined
  progress: number
  createdAt: Date
  url?: string | undefined
  artSetting: ArtSettings
  favourite: boolean
  artType: Features
  user: string

  constructor(
    id: number | undefined,
    user: string,
    artType: Features,
    artSetting: ArtSettings,
    title: string | undefined,
    favourite: boolean
  ) {
    this.id = id || 0
    this.user = user
    this.title = title
    this.progress = 0
    this.favourite = favourite
    this.createdAt = new Date()
    this.artType = artType
    this.artSetting = artSetting
  }
}

export class ArtSettings {
  prompt: string
  negativePrompt: string
  amount: number

  constructor(prompt: string, negativePrompt: string, amount: number) {
    this.prompt = prompt
    this.negativePrompt = negativePrompt
    this.amount = amount
  }
}
