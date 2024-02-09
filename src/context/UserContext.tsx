import React, { useEffect } from "react"
import {
  authenticateUser,
  getCurrentUser,
  useSetUserSettings,
} from "./UserHooks"
import { User } from "../@types/User"
import { UserSettings } from "../@types/UserSettings"
import { UserCredentials } from "../@types/UserCredentials"

export interface ContextProps {
  children?: React.ReactNode
}

export interface IUserContext {
  currentUser: User | undefined
  token: string | undefined
  settings: UserSettings
  setUserSettings(settings: UserSettings): void
  login: (credentials: UserCredentials) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

const UserContext = React.createContext<IUserContext>({} as IUserContext)

const UserProvider: React.FC<ContextProps> = ({ children }) => {
  async function fetchUser(): Promise<User | undefined> {
    if (user) return user
    const token = localStorage.getItem("token")
    if (token) {
      getCurrentUser(token).then((user) => {
        user.token = token
        setUser(user)
        setToken(token)
        setSettings(user.userSettings ?? new UserSettings())
      })
    } else {
      const isLoggedIn = await login(new UserCredentials("Guest", ""))
      if (isLoggedIn) {
        return user
      }
    }
  }

  const [user, setUser] = React.useState<User | undefined>()
  const [token, setToken] = React.useState<string>(
    localStorage.getItem("token") ?? ""
  )
  const [settings, setSettings] = React.useState<UserSettings>()

  const setUserSettingsMutation = useSetUserSettings(token)

  useEffect(() => {
    fetchUser()
  }, [])

  const setAsCurrentUser = (user: User) => {
    setUser(user)
    setToken(user.token)
    localStorage.setItem("token", user.token)
  }

  const login = async (credentials: UserCredentials) => {
    const user = await authenticateUser(credentials)
    if (user) {
      setAsCurrentUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(undefined)
    setToken("")
    localStorage.removeItem("token")
  }

  const setUserSettings = (settings: UserSettings) => {
    setSettings(settings)
    setUserSettingsMutation.mutateAsync(settings)
  }

  const contextValue: IUserContext = {
    currentUser: user,
    token: token,
    settings: settings ?? new UserSettings(),
    setUserSettings: setUserSettings,
    setUser: setAsCurrentUser,
    login: login,
    logout: logout,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export { UserContext, UserProvider }
