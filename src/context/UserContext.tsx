import React, { useEffect } from "react"
import {
  authenticateUser,
  useGenerateUser,
  useSetUserSettings,
  getCurrentUser,
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
  const [user, setUser] = React.useState<User | undefined>()
  const [token, setToken] = React.useState<string | undefined>(
    localStorage.getItem("token") ?? undefined
  )
  const [settings, setSettings] = React.useState<UserSettings>()

  const setUserSettingsMutation = useSetUserSettings(token)
  const generateUser = useGenerateUser()

  useEffect(() => {
    const storageToken = localStorage.getItem("token")
    if (storageToken) {
      getCurrentUser(storageToken)
        .then((user) => {
          user.token = storageToken
          setUser(user)
          setSettings(user.userSettings ?? new UserSettings())
        })
        .catch((error) => {
          if (!login()) {
            console.log("login failed with error: " + error)
          }
        })
    } else {
      if (!login()) {
        console.log("login failed")
      }
    }
  }, [])

  const setAsCurrentUser = (user: User) => {
    setUser(user)
    setToken(user.token)
    localStorage.setItem("token", user.token)
  }

  const login = async (credentials?: UserCredentials) => {
    let user: User | undefined
    if (credentials) user = await authenticateUser(credentials)
    else {
      const response = await generateUser.mutateAsync()
      if (response.status === 200 && response.data) user = response.data
    }
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
