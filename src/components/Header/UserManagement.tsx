import React, { useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useGetPermissions, useGetUser } from "../../context/UserHooks"
import { ArtContext } from "../../context/ArtContext"
import classes from "./MainHeader.module.css"

const UserManagement: React.FC = () => {
  const authContext = React.useContext(AuthContext)
  const artContext = React.useContext(ArtContext)
  const [creds, setCreds] = React.useState(0)

  const userResponse = useGetUser(authContext.currentUser?.userName, {
    enabled: !!authContext.currentUser,
  })

  const userPermissionResponse = useGetPermissions(authContext.currentUser, {
    enabled: !!authContext.currentUser,
  })

  if (userResponse.isSuccess) {
    authContext.currentUser = userResponse.data
  }

  useEffect(() => {
    console.log("UserManagement: checked creds")
    if (userPermissionResponse.isSuccess) {
      setCreds(userPermissionResponse.data.credentials)
    }
  }, [authContext.currentUser, userPermissionResponse])

  useEffect(() => {
    if (authContext.currentUser) {
      userPermissionResponse.refetch()
    }
  }, [artContext.arts])

  if (authContext.isLoggedIn) {
    return (
      <div className={classes.userManagement}>
        <p>Logged in as: {authContext.currentUser?.userName}
        <br/>
        {creds}
        </p>
        <button onClick={authContext.login}>Logout</button>
      </div>
    )
  } else {
    return <button onClick={authContext.login}>Login</button>
  }
}

export default UserManagement
