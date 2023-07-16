export class Art {
  id: number
  title?: string | undefined
  progress: number
  createdAt: Date
  url?: string | undefined
  settings?: ArtSettings
  favourite: boolean
  user: string

  constructor(id: number | undefined, user: string, title: string | undefined, favourite: boolean) {
    this.id = id || 0
    this.user = user
    this.title = title
    this.progress = 0
    this.favourite = favourite
    this.createdAt = new Date()
  }
}

export class ArtSettings {
  textPrompt: string
  negativePrompt: string
  amount: number  

  constructor(textPrompt: string, negativePrompt: string, amount: number) {
    this.textPrompt = textPrompt
    this.negativePrompt = negativePrompt
    this.amount = amount
  }
}