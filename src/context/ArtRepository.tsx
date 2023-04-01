import { Features } from "../@types/shared"
import { Art } from "../models/Art"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI
const categories = ["Flowers", "Text to image"]

export class ArtRepository {
  public static async getArts(): Promise<Art[]> {
    const url = `${imagineApiBaseUrl}/arts?artType=${Features.Txt2Img}`
    console.log(`fetching ${url} ...`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Cannot get request")
    }
    const responseJson = await response.json()

    const mappedArts = responseJson?.data.map((artJson: any) => {
      const art = new Art(artJson.title, false)
      return art
    })
    return mappedArts
  }

  public static async addArt(art: Art) {
    const url = `${imagineApiBaseUrl}/api/arts`

    const body = JSON.stringify(art)
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {'Content-Type':'application/json'},
    })

    if (!response.ok) {
      // todo: doesn't work :(
      throw new Error(response.toString())
    }

    const data = await response.json()
    console.log(data)
  }
}
