import axios, { AxiosError, AxiosResponse } from "axios"
import { UseQueryOptions, useMutation, useQuery } from "react-query"
import Problem from "../@types/problem"
import { Permission, User } from "../@types/User"
import { UserSettings } from "../@types/UserSettings"
import { UserCredentials } from "../@types/UserCredentials"
import { UserRegistration } from "../@types/UserRegistration"
import { Order } from "../@types/Order"
import { useEffect, useState } from "react"

const imagineApiBaseUrl = process.env.REACT_APP_IMAGINE_API_URI

const useLoginUser = (
  userName: string,
  config?: UseQueryOptions<User, AxiosError<Problem>>
) => {
  return useQuery<User, AxiosError<Problem>>(
    ["users", userName],
    () =>
      axios
        .post(`${imagineApiBaseUrl}/account/login?username=${userName}`)
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
          `${imagineApiBaseUrl}/account/permissions?username=${user!.userName}`,
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

async function authenticateUser(credentials: UserCredentials): Promise<User> {
  const url = `${imagineApiBaseUrl}/account/login`
  try {
    const response = await axios.post(url, credentials)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const useRegisterUser = () => {
  const url = `${imagineApiBaseUrl}/account/register`
  return useMutation<
    AxiosResponse<User>,
    AxiosError<Problem>,
    UserRegistration
  >((registration) => axios.post(url, registration))
}

function getCurrentUser(token: string): Promise<User> {
  const url = `${imagineApiBaseUrl}/account/current`
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

const useSetUserSettings = (token?: string) => {
  const url = `${imagineApiBaseUrl}/account/settings`
  return useMutation<AxiosResponse, AxiosError<Problem>, UserSettings>(
    (settings) =>
      axios.put(url, settings, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  )
}

const useGetUserOrders = (token: string) => {
  const url = `${imagineApiBaseUrl}/order`
  return useQuery<[Order], AxiosError<Problem>>(
    ["orders", token],
    () =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data),
    { enabled: !!token }
  )
}

export function useLocalStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

export {
  useLoginUser,
  useGetPermissions,
  authenticateUser,
  getCurrentUser,
  useSetUserSettings,
  useRegisterUser,
  useGetUserOrders,
}
