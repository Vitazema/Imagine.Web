import React from "react"
import logo from "../../assets/logo192.png"
import UserManagement from "./UserManagement"
import { AiTypes as AiType } from "../../@types/shared"
import {
  AppBar,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material"
import { features } from "../../@types/UserSettings"
import { UserContext } from "../../context/UserContext"

const Header: React.FC = () => {
  const userContext = React.useContext(UserContext)

  const featureChangeHandler = (
    e: React.MouseEvent<HTMLElement>,
    aiType: AiType
  ) => {
    e.preventDefault()
    const newSettings = { ...userContext.settings, selectedFeature: aiType}
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
            <img src={logo} width={50} alt="logo" />
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={userContext.settings.selectedFeature}
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
            </ToggleButtonGroup>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <UserManagement />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
