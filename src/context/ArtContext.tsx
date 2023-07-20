import React, { useCallback, useEffect } from "react"
import { IArtDbContext, ContextProps } from "../@types/context"
import { ArtRequest, Features } from "../@types/shared"
import { Art, ArtSettings } from "../@types/Art"
import {
  RequestFilter,
  useAddArt,
  useDeleteArt,
  useEditArt,
  useGetArts,
} from "./ArtHooks"
import { AuthContext } from "./AuthContext"
import { UseMutationResult, UseQueryResult } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import Problem from "../@types/problem"

const ArtContext = React.createContext<IArtDbContext>({} as IArtDbContext)

const ArtProvider: React.FC<ContextProps> = ({ children }) => {
  const authContext = React.useContext(AuthContext)
  const [aiType, setAiType] = React.useState<Features>(Features.Flowers)
  const [arts, setArts] = React.useState<Art[]>([])
  const [error, setError] = React.useState("")
  const addArtMutation = useAddArt()
  const editArtMutation = useEditArt()
  const deleteArtMutation = useDeleteArt()

  const addArt = (
    settings: ArtSettings
  ):
    | UseMutationResult<
        AxiosResponse<any, any>,
        AxiosError<Problem, any>,
        Art,
        unknown
      >
    | undefined => {
    const art = new Art(
      undefined,
      authContext.userName,
      aiType,
      settings,
      settings.prompt,
      false
    )
    try {
      addArtMutation.mutate(art)

      if (addArtMutation.isSuccess) {
        setArts((currentArts) => {
          return currentArts.concat(art)
        })
      }
      return addArtMutation
    } catch (error: any) {
      setError(error.message)
    }
  }

  const editArt = (artId: number) => {
    try {
      const art = arts.find((art) => art.id === artId)
      if (art !== undefined) {
        editArtMutation.mutate(art)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const cancelArt = (artId: number) => {
    deleteArtMutation.mutate(artId)
    setArts((currentArts) => {
      return currentArts.filter((art) => art.id !== artId)
    })
  }

  const contextValue = {
    arts,
    setArts,
    aiType,
    setAiType,
    addArt,
    editArt,
    cancelArt,
  }

  return (
    <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>
  )
}

export { ArtProvider, ArtContext }
