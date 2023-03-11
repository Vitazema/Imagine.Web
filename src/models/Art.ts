export class Art {
  id: number
  title: string
  progress: number
  createdAt: Date
  prompt: Prompt | undefined
  favourite: boolean

  constructor(title: string, favourite: boolean) {
    this.id = Math.floor(Math.random() * 100)
    this.title = title
    this.progress = Math.floor(Math.random() * 100)
    this.createdAt = new Date()
    this.favourite = favourite
  }

  SetSettings = (prompt: Prompt) => {
    this.prompt = prompt
  }
}

export class Prompt {
  textPrompt: string
  negativePrompt: string
  amount: number

  constructor(textPrompt: string, negativePrompt: string, amount: number) {
    this.textPrompt = textPrompt
    this.negativePrompt = negativePrompt
    this.amount = amount
  }
}