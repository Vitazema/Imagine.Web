import React, { useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useGetPermissions, useLoginUser } from "../../hooks/UserHooks"
import { ArtContext } from "../../context/ArtContext"
import { Button } from "@mui/material"

const UserManagement: React.FC = () => {
  const authContext = React.useContext(AuthContext)
  const artContext = React.useContext(ArtContext)
  const [creds, setCreds] = React.useState(0)

  const userResponse = useLoginUser(authContext.currentUser?.userName, {
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

  if (authContext.currentUser) {
    return (
      <div>
        <p>
          Logged in as: {authContext.currentUser?.userName}
          <br />
          {creds}
        </p>
        <button onClick={authContext.login}>Logout</button>
      </div>
    )
  } else {
    return (
      <Button variant="contained" onClick={authContext.login}>
        Login
      </Button>
    )
  }
}

export default UserManagement
