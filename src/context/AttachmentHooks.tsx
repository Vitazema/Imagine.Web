import axios, { AxiosError, AxiosResponse } from "axios"
import { useMutation } from "react-query"
import Problem from "../@types/problem"
import { Attachment } from "../@types/Attachment"

const imagineApiBaseUrl = import.meta.env.VITE_IMAGINE_API_URI

async function getAttachment(id: string) {
  const url = `${imagineApiBaseUrl}/attachment/${id}`
  return axios.get<Attachment>(url).then((response) => response.data)
}

const useUpsertAttachment = () => {
  return useMutation<AxiosResponse, AxiosError<Problem>, Attachment>(
    (attachment) => {
      const url = `${imagineApiBaseUrl}/attachment`
      return axios.post(url, attachment)
    }
  )
}

export { getAttachment, useUpsertAttachment }
