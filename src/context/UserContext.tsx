import React, { useEffect } from "react"
import {
  authenticateUser,
  getCurrentUser,
  registerUser,
  useSetUserSettings,
} from "./UserHooks"
import { User } from "../@types/User"
import { UserSettings } from "../@types/UserSettings"
import { UserCredentials } from "../@types/UserCredentials"
import { UserRegistration } from "../@types/UserRegistration"

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
  register: (registration: UserRegistration) => Promise<boolean>
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
      const isLoggedIn = await loginAction(new UserCredentials("Guest", ""))
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

  const loginAction = async (credentials: UserCredentials) => {
    const user = await authenticateUser(credentials)
    if (user) {
      login(user)
      return true
    }
    return false
  }

  const login = (user: User) => {
    setUser(user)
    setToken(user.token)
    localStorage.setItem("token", user.token)
  }

  const logout = () => {
    setUser(undefined)
    setToken("")
    localStorage.removeItem("token")
  }

  const register = async (registration: UserRegistration) => {
    const user = await registerUser(registration)
    if (user) {
      login(user)
      return true
    }
    return false
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
    logout: logout,
    register: register,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export { UserContext, UserProvider }
