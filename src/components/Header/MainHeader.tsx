import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Navigation from "../Navigation/Navitgation"
import classes from "./MainHeader.module.css"

const MainHeader: React.FC = () => {
  const authContext = React.useContext(AuthContext)

  return (
    <header className={classes["main-header"]}>
      <h1>Main</h1>
      <Navigation/>
      {authContext?.isLoggedIn && <p>Logged in as: {authContext.userName}</p>}
      <button onClick={authContext?.login}>Login</button>
    </header>
  )
}

export default MainHeader