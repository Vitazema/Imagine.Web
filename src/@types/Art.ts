import { AiTypes } from "./shared"

export class Art {
  id: string
  title?: string | undefined
  progress: number
  createdAt: Date
  urls: string[]
  favourite: boolean
  artType: AiTypes
  user?: string
  parameters: Parameters
  rating?: number

  constructor(
    id: string,
    artType: AiTypes,
    parameters: Parameters,
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
    this.parameters = parameters
  }
}

export class Parameters {
  prompt: string
  negativePrompt: string | undefined
  amount: number
  image?: string | undefined
  attachmentId?: string

  constructor(prompt: string, amount: number) {
    this.prompt = prompt
    this.amount = amount
  }
}

export type ArtStatus = {
  id: string
  workerId: number
  status: string
  progress?: number
  relativeEstimation?: number
  urls: string[]
  active: boolean
  queued: boolean
  completed: boolean
}
