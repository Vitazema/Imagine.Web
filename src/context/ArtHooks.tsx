import { ArtRequest, Features } from "../@types/shared"
import { Art } from "../@types/Art"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useGetArts = () => {
  const url = `${imagineApiBaseUrl}/arts?artType=${Features.Txt2Img}`
  return useQuery<ArtRequest, AxiosError>("arts", () =>
    axios.get(url).then((response) => response.data)
  )
}

const useGetArt = (id: number) => {
  const url = `${imagineApiBaseUrl}/arts/${id}`
  return useQuery<Art, AxiosError>("art", () =>
    axios.get(url).then((response) => response.data)
  )
}

const useAddArt = () => {
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  return useMutation<AxiosResponse, AxiosError, Art>(
    "addArt",
    (art) => axios.post(url, art),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("arts")
      },
    }
  )

  // const body = JSON.stringify(art)
  // const response = await fetch(url, {
  //   method: "POST",
  //   body: body,
  //   headers: { "Content-Type": "application/json" },
  // })

  // if (!response.ok) {
  //   // todo: doesn't work :(
  //   throw new Error(response.toString())
  // }

  // const data = await response.json()
  // console.log(data)
}

const useEditArt = () => {
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError, Art>(
    "editArt",
    (art) => axios.put(url, art),
    {
      onSuccess: (_, art) => {
        queryClient.invalidateQueries("arts")
        nav("/")
      },
    }
  )
}

const useDeleteArt = () => {
  const queryClient = useQueryClient()
  const url = `${imagineApiBaseUrl}/arts`
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError, number>(
    "deleteArt",
    (artId) => axios.delete(`${url}/${artId}`),
    {
      onSuccess: (_, art) => {
        queryClient.invalidateQueries("arts")
        nav("/")
      },
    }
  )
}

export { useGetArts, useGetArt, useAddArt, useEditArt, useDeleteArt }
