import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Avatar, Box, Typography } from "@mui/material"
import ErrorModule from "../Common/ErrorModule"
import styles from "./Profile.module.css"

export default function Profile() {
  const userContext = useContext(UserContext)
  const user = userContext.currentUser
  if (!user) {
    return <ErrorModule message="User not found" />
  }
  return (
    <Box className={styles.profileContainer}>
      <Avatar
        alt={user.userName} // Display the user's userName as alt text
        src="/user.png"
        className={styles.profileAvatar}
      />
      <Typography variant="h4" component="h1" className={styles.profileTitle}>
        {user.userName} {/* Display the user's userName */}
      </Typography>
      <Typography variant="body1" className={styles.profileDescription}>
        Role: {user.role} {/* Display the user's role */}
        {/* Here you can add more user information based on your design */}
      </Typography>
      <Typography variant="body1">
        Credentials: {userContext.currentUser?.permission?.credentials}
      </Typography>
    </Box>
  )
}
