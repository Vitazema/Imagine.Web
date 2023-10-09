import React, { useEffect } from "react"
import { ContextProps } from "../@types/context"
import { useLoginUser } from "../hooks/UserHooks"
import { IAuthContext } from "./IAuthContext"
import { User } from "../@types/User"

const userNames = ["System", "Guest", "UserName", "TrialUser", "PaidUser"]

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  
  const [userName, setUserName] = React.useState(userNames[0])

  const user = useLoginUser(userName)

  const [currentUser, setUser] = React.useState<User>(user.data as User)

  useEffect(() => {
    if (user.isSuccess) {
      setUser(user.data)
      // setLoggedIn(true)
    }
  }, [user.data])

  const loginHandler = () => {
    var index = userNames.indexOf(userName)
    if (index < userNames.length - 1){
      setUserName(userNames[index + 1])
      user.refetch()
      return
    }
    else {
      setUserName(userNames[0])
      user.refetch()
      return
    }
  }

  const contextValue: IAuthContext = {
    userName,
    currentUser,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
