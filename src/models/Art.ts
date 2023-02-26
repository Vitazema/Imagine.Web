class Art{
    id: number
    title: string
    progress: number
    constructor(title: string) {
        this.id = Date.now() + Math.floor(Math.random() * 100)
        this.title = title
        this.progress = Math.floor(Math.random() * 100)
    }
}

export default Art;