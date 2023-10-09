import axios, { AxiosError } from "axios"
import { UseQueryOptions, useQuery } from "react-query"
import Problem from "../@types/problem"
import { Permission, User } from "../@types/User"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useLoginUser = (userName: string, config?:UseQueryOptions<User, AxiosError<Problem>>) => {  
  return useQuery<User, AxiosError<Problem>>(["users", userName], () =>
    axios.post(`${imagineApiBaseUrl}/users/login?username=${userName}`).then((response) => response.data),
    config
  )
}

const useGetPermissions = (user: User, config?:UseQueryOptions<Permission, AxiosError<Problem>>) => {  
  return useQuery<Permission, AxiosError<Problem>>(["permission", user], () =>
    axios.get(`${imagineApiBaseUrl}/users/permissions?username=${user.userName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then((response) => response.data),
    config
  )
}

export { useLoginUser, useGetPermissions }