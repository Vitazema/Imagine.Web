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
  attachmentId?: string

  constructor(prompt: string, amount: number) {
    this.prompt = prompt
    this.amount = amount
  }
}

export class ArtStatus {
  id: string
  workerId: number
  status: string
  progress: number
  relativeEstimation: number
  urls: string[]

  constructor(
    id: string,
    workerId: number,
    status: string,
    progress: number,
    relativeEstimation: number,
    urls: string[]
  ) {
    this.id = id
    this.workerId = workerId
    this.status = status
    this.progress = progress
    this.relativeEstimation = relativeEstimation
    this.urls = urls
  }
}
