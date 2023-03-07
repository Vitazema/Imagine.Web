import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Header: React.FC = () => {
  const authContext = React.useContext(AuthContext)

  return (
    <nav>
      {authContext?.isLoggedIn && <p>Logged in as: {authContext.userName}</p>}
      <button onClick={authContext?.login}>Login</button>
    </nav>
  )
}

export default Header