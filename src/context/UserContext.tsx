import React, { useEffect } from "react"
import { authenticateUser, getCurrentUser, useLoginUser } from "./UserHooks"
import { User } from "../@types/User"
import { UserConfig } from "../@types/UserConfig"
import { AiTypes } from "../@types/shared"

export interface ContextProps {
  children?: React.ReactNode
}

export interface IUserContext {
  currentUser: User | undefined
  token: string | undefined
  config: UserConfig
  setConfig: (config: UserConfig) => void
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
      })
    }
    else {
      const isLoggedIn = await loginAction("Guest")
      if (isLoggedIn) {
        return user
      }
    }
  }

  async function fetchConfig(): Promise<UserConfig | undefined> {
    if (config) return config
    else {
      setConfig(new UserConfig({selectedFeature: AiTypes.Txt2Img}))
    }
  }
  
  const [user, setUser] = React.useState<User | undefined>()
  const [token, setToken] = React.useState<string>(localStorage.getItem("token") ?? "")
  const [config, setConfig] = React.useState<UserConfig>()

  useEffect(() => {
    fetchUser()
    fetchConfig()    
  }, [])

  const loginAction = async (userName: string) => {
    const user = await authenticateUser(userName)
    if (user)
    {
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

  const contextValue: IUserContext = {
    currentUser: user,
    token: token,
    config: config ?? new UserConfig(),
    setConfig: setConfig,
    login: loginAction,
    logout: logoutAction,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export { UserContext, UserProvider }

