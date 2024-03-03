import React from "react"
import logo from "../../assets/logo192.png"
import UserManagement from "./UserManagement"
import { AiTypes as AiType } from "../../@types/shared"
import {
  AppBar,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material"
import { features } from "../../@types/UserSettings"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  const userContext = React.useContext(UserContext)

  const featureChangeHandler = (
    e: React.MouseEvent<HTMLElement>,
    aiType: AiType
  ) => {
    e.preventDefault()
    const newSettings = { ...userContext.settings, selectedFeature: aiType }
    userContext.setUserSettings(newSettings)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid item>
            <Link to="/">
              <img src={logo} width={50} alt="logo"></img>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="h6">Text to Image</Typography>
            {/* <ToggleButtonGroup
              value={userContext.settings?.selectedFeature}
              exclusive
              onChange={featureChangeHandler}
            >
              {features.map((feature) => {
                return (
                  <ToggleButton key={feature} value={feature}>
                    {AiType[feature]}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup> */}
          </Grid>
          <UserManagement />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
