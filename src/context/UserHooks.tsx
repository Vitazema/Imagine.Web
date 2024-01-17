import axios, { AxiosError } from "axios"
import { UseQueryOptions, useQuery } from "react-query"
import Problem from "../@types/problem"
import { Permission, User } from "../@types/User"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useLoginUser = (
  userName: string,
  config?: UseQueryOptions<User, AxiosError<Problem>>
) => {
  return useQuery<User, AxiosError<Problem>>(
    ["users", userName],
    () =>
      axios
        .post(`${imagineApiBaseUrl}/users/login?username=${userName}`)
        .then((response) => response.data),
    config
  )
}

const useGetPermissions = (
  user: User | undefined,
  config?: UseQueryOptions<Permission, AxiosError<Problem>>
) => {
  return useQuery<Permission, AxiosError<Problem>>(
    ["permission", user],
    () =>
      axios
        .get(
          `${imagineApiBaseUrl}/users/permissions?username=${user!.userName}`,
          {
            headers: {
              Authorization: `Bearer ${user!.token}`,
            },
          }
        )
        .then((response) => response.data),
    config ?? { enabled: !!user }
  )
}

async function authenticateUser(userName: string): Promise<User> {
  const url = `${imagineApiBaseUrl}/users/login?username=${userName}`
  try {
    const response = await axios.post(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

function getCurrentUser(token: string): Promise<User> {
  const url = `${imagineApiBaseUrl}/users/current`
  try {
    return axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return response.data
      })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { useLoginUser, useGetPermissions, authenticateUser, getCurrentUser }