import React from "react"
import logo from "../../assets/logo192.png"
import UserManagement from "./UserManagement"
import { ArtContext } from "../../context/ArtContext"
import { features } from "../../config"
import { Features } from "../../@types/shared"
import {
  AppBar,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material"

const MainHeader: React.FC = () => {
  const artContext = React.useContext(ArtContext)

  const categoryChangedHandler = (
    e: React.MouseEvent<HTMLElement>,
    aiType: Features
  ) => {
    e.preventDefault()
    artContext.setAiType(aiType)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid  container alignItems={"center"} >
          <Grid item>
            <div className="col-5">
              <img src={logo} width={50} className="logo" alt="logo" />
            </div>
            <h1>Main</h1>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={artContext.aiType}
              exclusive
              onChange={categoryChangedHandler}
            >
              {features.map((feature) => {
                return (
                  <ToggleButton key={feature} value={feature}>
                    {Features[feature]}
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

export default MainHeader
