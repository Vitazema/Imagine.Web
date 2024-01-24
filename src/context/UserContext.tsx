import React, { useEffect } from "react"
import {
  authenticateUser,
  getCurrentUser,
  useLoginUser,
  useSetUserSettings,
} from "./UserHooks"
import { User } from "../@types/User"
import { UserSettings } from "../@types/UserSettings"
import { AiTypes } from "../@types/shared"

export interface ContextProps {
  children?: React.ReactNode
}

export interface IUserContext {
  currentUser: User | undefined
  token: string | undefined
  settings: UserSettings
  setUserSettings(settings: UserSettings): void
  login: (userName: string) => Promise<boolean>
  logout: () => void
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
        setUserSettings(user.userSettings ?? new UserSettings())
      })
    } else {
      const isLoggedIn = await loginAction("Guest")
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

  const loginAction = async (userName: string) => {
    const user = await authenticateUser(userName)
    if (user) {
      setUser(user)
      setToken(user.token)
      localStorage.setItem("token", user.token)
      return true
    }
    return false
  }

  const logoutAction = () => {
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
    login: loginAction,
    logout: logoutAction,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export { UserContext, UserProvider }
