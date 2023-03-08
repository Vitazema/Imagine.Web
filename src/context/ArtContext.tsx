import React from "react"
import { IArtDbContext, ContextProps } from "../@types/context"
import Art, { Prompt } from "../models/Art"
import { ArtRepository } from "./ArtRepository"

export const ArtContext = React.createContext<IArtDbContext>({
  arts: [],
  addArt: () => {},
  cancelArt: (id: number) => {},
  isLoading: false,
  getArts: () => [],
  error: null
})

const ArtProvider = ({ children }: ContextProps) => {
  const [arts, setArts] = React.useState<Art[]>([])
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

    // update state
    setArts((currentArts) => {
      return currentArts.concat(newArt)
    })
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
    getArts: getArtsHandler,
    addArt: addArtHandler,
    cancelArt: cancelArtHandler,
    isLoading: isLoading,
    error: error
  }

  return (
    <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>
  )
}

export default ArtProvider
