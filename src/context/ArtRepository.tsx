import { ArtRequest, Features } from "../@types/shared"
import { Art } from "../@types/Art"
import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

  const useGetArts = () => {
    const url = `${imagineApiBaseUrl}/arts?artType=${Features.Txt2Img}`
    return useQuery<ArtRequest, AxiosError>("arts", () => 
      axios.get(url).then((response) => response.data)
    )
  }

const useAddArt  = async (art: Art) => {
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

export { useGetArts, useAddArt}
