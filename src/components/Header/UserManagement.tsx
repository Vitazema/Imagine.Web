import React, { useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useGetPermissions, useGetUser } from "../../context/UserHooks"
import { ArtContext } from "../../context/ArtContext"

const UserManagement: React.FC = () => {
  const authContext = React.useContext(AuthContext)
  const artContext = React.useContext(ArtContext)
  const [creds, setCreds] = React.useState(0)
  const userResponse = useGetUser(authContext.currentUser?.id, { enabled: !!authContext.currentUser })

  const userPermissionResponse = useGetPermissions(authContext.currentUser, {
    enabled: !!authContext.currentUser,
  })

  if (userResponse.isSuccess) {
    authContext.currentUser = userResponse.data
    // authContext.login()
  }

  useEffect(() => {
    console.log("UserManagement: checked creds")
    if (userPermissionResponse.isSuccess) {
      setCreds(userPermissionResponse.data.credentials)
    }
  }, [authContext.currentUser, userResponse.data, userPermissionResponse])

  useEffect(() => {
    if (authContext.currentUser) {
      userPermissionResponse.refetch()
    }
  }, [artContext.arts])

  if (authContext.isLoggedIn) {
    return (
      <div>
        <p>Logged in as: {authContext.currentUser?.fullName}</p>
        <p>Permissions: {creds}</p>
        <button onClick={authContext.login}>Logout</button>
      </div>
    )
  } else {
    return <button onClick={authContext.login}>Login</button>
  }
}

export default UserManagement
