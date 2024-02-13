import { ArtRequest, AiTypes as Feature, AiTypes } from "../@types/shared"
import { Art, ArtStatus } from "../@types/Art"
import axios, { AxiosError, AxiosResponse } from "axios"
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query"
import React from "react"
import Problem from "../@types/problem"
import { UserContext } from "./UserContext"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

export class RequestFilter {
  constructor(public aiType: Feature, public limit: number) {}
}

const useGetArts = (filter: RequestFilter, isEnabled: boolean) => {
  const userContext = React.useContext(UserContext)
  const buildUrl = (pageParam: number) => {
    let url = `${imagineApiBaseUrl}/arts?artType=${AiTypes[filter.aiType]}`
    url += `&page=${pageParam}&limit=${filter.limit}`
    return url
  }
  return useInfiniteQuery<ArtRequest, AxiosError<Problem>>(
    "arts",
    ({ pageParam = 1 }) =>
      axios
        .get(buildUrl(pageParam), {
          headers: {
            Authorization: `Bearer ${userContext.currentUser?.token}`,
          },
        })
        .then((response) => response.data),
    {
      getNextPageParam: (lastPage, loadedPages) => {
        const totalItemsLoaded = loadedPages.length * filter.limit!
        if (totalItemsLoaded < lastPage.count) {
          return loadedPages.length + 1
        }
      },
      enabled: isEnabled,
    }
  )
}

const useGetArt = (id: string) => {
  const url = `${imagineApiBaseUrl}/arts/${id}`
  return useQuery<Art, AxiosError<Problem>>(["arts", id], () =>
    axios.get(url).then((response) => response.data)
  )
}

const useAddArt = () => {
  const userContext = React.useContext(UserContext)
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  return useMutation<AxiosResponse, AxiosError<Problem>, Art>(
    (art) =>
      axios.post(url, art, {
        headers: {
          Authorization: `Bearer ${userContext.currentUser?.token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("arts")
      },
    }
  )
}

const useEditArt = () => {
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  return useMutation<AxiosResponse, AxiosError<Problem>, Art>(
    (art) => axios.put(url, art),
    {
      onSuccess: (_, art) => {
        queryClient.invalidateQueries("arts")
      },
    }
  )
}

const useDeleteArt = () => {
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  return useMutation<AxiosResponse, AxiosError<Problem>, string>(
    (artId) => axios.delete(`${url}/${artId}`),
    {
      onSuccess: (_, art) => {
        queryClient.invalidateQueries("arts")
      },
    }
  )
}

const useGetProgress = (id: string, shouldCheckProgress: boolean) => {
  const url = `${imagineApiBaseUrl}/progress/${id}`
  return useQuery<ArtStatus, AxiosError<Problem>>(
    ["arts", id, "progress"],
    () => axios.get(url).then((response) => response.data),
    {
      refetchInterval: shouldCheckProgress ? 1000 : false,
      enabled: shouldCheckProgress,
    }
  )
}

export {
  useGetArts,
  useGetArt,
  useAddArt,
  useEditArt,
  useDeleteArt,
  useGetProgress,
}
