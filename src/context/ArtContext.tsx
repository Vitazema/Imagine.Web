import React, { useCallback } from "react"
import { IArtDbContext, ContextProps } from "../@types/context"
import { Features } from "../@types/shared"
import { Art, ArtSettings } from "../@types/Art"
import { useAddArt, useDeleteArt, useGetArt, useGetArts } from "./ArtHooks"
import { Status } from "../components/Common/ApiStatus"
import { AuthContext } from "./AuthContext"

// export const ArtContextDefaultValues: IArtDbContext = {
//   artSettings: undefined,
//   arts: [],
//   features: [Features.Flowers, Features.Txt2Img],
//   getApiStatus: () => ({ status: Status.Idle, isSuccess: false, error: null }),
//   getArts: () => null,
//   addArt: () => null,
//   cancelArt: (id: number) => null,
//   submitArt: (art: Art) => null
// }

export const ArtContext = React.createContext<IArtDbContext>(
  {} as IArtDbContext
)

const ArtProvider: React.FC<ContextProps> = ({ children }) => {
  const authContext = React.useContext(AuthContext)
  const [arts, setArts] = React.useState<Art[]>([])
  const [error, setError] = React.useState(null)
  const { data, status, isSuccess } = useGetArts()
  const features = [Features.Flowers, Features.Txt2Img]
  const addArtMutation = useAddArt()
  const deleteArtMutation = useDeleteArt()

  const getApiStatus = () => {
    return { status: status as Status, isSuccess, error }
  }

  const getArts = useCallback(() => {
    setError(null)

    try {
      if (isSuccess) {
        const arts = data.data?.map((artJson: Art) => {
          const art = new Art(artJson.id, artJson.user, artJson.title, false)
          if (artJson.settings !== undefined) {
            art.settings = artJson.settings
          }
          return art
        })

        // todo: maybe arts перекрывают new arts

        setArts(arts)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }, [data])

  const submitArt = (settings: ArtSettings) => {
    const art = new Art(
      undefined,
      authContext.userName,
      settings.textPrompt,
      false
    )
    try {
      addArtMutation.mutate(art)

      if (addArtMutation.isSuccess) {
        setArts((currentArts) => {
          return currentArts.concat(art)
        })
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const editArt = () => {
    try {
      
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

  React.useEffect(() => {
    getArts()
  }, [getArts])

  const contextValue = {
    arts,
    features,
    getApiStatus,
    getArts,
    submitArt,
    editArt,
    cancelArt,
  }

  return (
    <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>
  )
}

export default ArtProvider
