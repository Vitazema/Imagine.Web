import React from "react"
import Navigation from "../Navigation/Navitgation"
import classes from "./MainHeader.module.css"
import logo from "../../assets/logo192.png"
import UserManagement from "./UserManagement"

const MainHeader: React.FC = () => {
  return (
    <section>
      <header className={classes["main-header"]}>
        <div className="col-5">
          <img src={logo} width={50} className="logo" alt="logo" />
        </div>
        <h1>Main</h1>
        <Navigation />
        <UserManagement />
      </header>
    </section>
  )
}

export default MainHeader
