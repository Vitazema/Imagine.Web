import React from "react"
import { IArtDbContext, ContextProps } from "../@types/context"
import { Features } from "../@types/shared"
import { Art, Prompt } from "../models/Art"
import { ArtRepository } from "./ArtRepository"

export const ArtContext = React.createContext<IArtDbContext>({
  arts: [],
  features: [Features.Flowers, Features.Txt2Img],
  isLoading: false,
  error: null,
  getArts: () => [],
  addArt: () => {},
  cancelArt: (id: number) => {},
})

const ArtProvider = ({ children }: ContextProps) => {
  const [arts, setArts] = React.useState<Art[]>([])
  const [features, setFeatures] = React.useState<Features[]>([Features.Flowers, Features.Txt2Img])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const getArtsHandler = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const arts = await ArtRepository.getArts()

      setArts(arts)
    } catch (error: any) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  const addArtHandler = (prompt: Prompt) => {
    const newArt = new Art(prompt.textPrompt, false)
    newArt.SetSettings(prompt)

    setError(null)

    try {
      ArtRepository.addArt(newArt)
      // update state
      setArts((currentArts) => {
        return currentArts.concat(newArt)
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const cancelArtHandler = (artId: number) => {
    setArts((currentArts) => {
      return currentArts.filter((art) => art.id !== artId)
    })
  }

  React.useEffect(() => {
    getArtsHandler()
  }, [getArtsHandler])

  const contextValue: IArtDbContext = {
    arts: arts,
    features: features,
    getArts: getArtsHandler,
    addArt: addArtHandler,
    cancelArt: cancelArtHandler,
    isLoading: isLoading,
    error: error,
  }

  return (
    <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>
  )
}

export default ArtProvider
