import React, { useCallback } from "react"
import { IArtDbContext, ContextProps } from "../@types/context"
import { Features } from "../@types/shared"
import { Art, Prompt } from "../@types/Art"
import { useAddArt, useGetArt, useGetArts } from "./ArtRepository"
import { Status } from "../components/Common/ApiStatus"

export const ArtContextDefaultValues: IArtDbContext = {
  arts: [],
  features: [Features.Flowers, Features.Txt2Img],
  getApiStatus: () => ({ status: Status.Idle, isSuccess: false, error: null }),
  getArts: () => null,
  addArt: () => null,
  cancelArt: (id: number) => null,
}

export const ArtContext = React.createContext<IArtDbContext>(
  ArtContextDefaultValues
)

const ArtProvider = ({ children }: ContextProps) => {
  const [arts, setArts] = React.useState<Art[]>([])
  const [error, setError] = React.useState(null)
  const { data, status, isSuccess } = useGetArts()
  const features = [Features.Flowers, Features.Txt2Img]

  const getApiStatus = () => {
    return { status: status as Status, isSuccess, error }
  }

  const getArts = useCallback(() => {
    setError(null)

    try {
      if (isSuccess) {
        const arts = data.data?.map((artJson: Art) => {
          const art = new Art(artJson.id, artJson.title, false)
          return art
        })

        setArts(arts)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }, [data])

  const addArt = (prompt: Prompt) => {
    // const newArt = new Art(prompt.textPrompt, false)
    // newArt.SetSettings(prompt)

    setError(null)

    try {
      // useAddArt(newArt)
      // update state
      // setArts((currentArts) => {
      //   return currentArts.concat(newArt)
      // })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const cancelArt = (artId: number) => {
    setArts((currentArts) => {
      return currentArts.filter((art) => art.id !== artId)
    })
  }

  React.useEffect(() => {
    getArts()
  }, [getArts])

  const contextValue = {
    arts,
    features,
    getApiStatus,
    getArts,
    addArt,
    cancelArt,
  }

  return (
    <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>
  )
}

export default ArtProvider
