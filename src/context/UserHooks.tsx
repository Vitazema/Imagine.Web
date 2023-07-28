import axios, { AxiosError } from "axios"
import { UseQueryOptions, useQuery } from "react-query"
import Problem from "../@types/problem"
import { Permission, User } from "../@types/User"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useGetUser = (userName: string, config?:UseQueryOptions<User, AxiosError<Problem>>) => {  
  return useQuery<User, AxiosError<Problem>>(["users", userName], () =>
    axios.get(`${imagineApiBaseUrl}/users?username=${userName}`).then((response) => response.data),
    config
  )
}

const useGetPermissions = (user: User, config?:UseQueryOptions<Permission, AxiosError<Problem>>) => {  
  return useQuery<Permission, AxiosError<Problem>>(["permission", user], () =>
    axios.get(`${imagineApiBaseUrl}/users/permissions?userId=${user.id}`).then((response) => response.data),
    config
  )
}

export { useGetUser, useGetPermissions }