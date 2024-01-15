import React, { useEffect } from "react"
import { authenticateUser, getCurrentUser, useLoginUser } from "./UserHooks"
import { User } from "../@types/User"

export interface ContextProps {
  children?: React.ReactNode
}

export interface IAuthContext {
  currentUser: User | undefined
  token: string | undefined
  login: (userName: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
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
  
  const [user, setUser] = React.useState<User | undefined>()
  const [token, setToken] = React.useState<string>(localStorage.getItem("token") ?? "")

  useEffect(() => {
    fetchUser()
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

  const contextValue: IAuthContext = {
    currentUser: user,
    token: token,
    login: loginAction,
    logout: logoutAction,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

