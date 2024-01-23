import axios, { AxiosError, AxiosResponse } from "axios"
import { useMutation } from "react-query"
import Problem from "../@types/problem"
import { Attachment } from "../@types/Attachment"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useUpsertAttachment = () => {
  return useMutation<AxiosResponse, AxiosError<Problem>, Attachment>(
    (attachment) => {
      const url = `${imagineApiBaseUrl}/attachment`
      return axios.post(url, attachment)
    }
  )
}

export { useUpsertAttachment }