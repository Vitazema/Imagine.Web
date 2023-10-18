import { ArtRequest, AiTypes as Feature, AiTypes } from "../@types/shared"
import { Art } from "../@types/Art"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import React from "react"
import Problem from "../@types/problem"
import { ArtContext } from "../context/ArtContext"
import { AuthContext } from "../context/AuthContext"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

export class RequestFilter {
  constructor(public aiType: Feature) {}
}

const useGetArts = (filter: RequestFilter) => {
  const artContext = React.useContext(ArtContext)
  const userContext = React.useContext(AuthContext)
  const url = `${imagineApiBaseUrl}/arts?artType=${AiTypes[filter.aiType]}`
  return useQuery<ArtRequest, AxiosError<Problem>>(
    ["arts", artContext.aiType],
    () =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${userContext.currentUser?.token}`,
          },
        })
        .then((response) => response.data)
  )
}

const useGetArt = (id: string) => {
  const url = `${imagineApiBaseUrl}/arts/${id}`
  return useQuery<Art, AxiosError<Problem>>(["arts", id], () =>
    axios.get(url).then((response) => response.data)
  )
}

const useAddArt = () => {
  const userContext = React.useContext(AuthContext)
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  return useMutation<AxiosResponse, AxiosError<Problem>, Art>(
    (art) =>
      axios.post(
        url,
        art,
        {
          headers: {
            Authorization: `Bearer ${userContext.currentUser?.token}`,
          }
        }
      ),
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

export { useGetArts, useGetArt, useAddArt, useEditArt, useDeleteArt }
