class Art {
  id: number
  title: string
  progress: number
  createdAt: Date
  prompt: Prompt | undefined

  constructor(title: string) {
    this.id = Date.now() + Math.floor(Math.random() * 100);
    this.title = title;
    this.progress = Math.floor(Math.random() * 100);
    this.createdAt = new Date();
  }

  SetSettings = (prompt: Prompt) => {
    this.prompt = prompt
  }
}

export class Prompt {
  textPrompt: string
  negativePrompt: string
  amount: number

  constructor(textPrompt: string, negativePrompt: string, amount: number){
    this.textPrompt = textPrompt
    this.negativePrompt = negativePrompt
    this.amount = amount
  }
}

export default Art;
