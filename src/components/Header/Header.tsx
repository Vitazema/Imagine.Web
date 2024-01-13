import React from "react"
import logo from "../../assets/logo192.png"
import UserManagement from "./UserManagement"
import { ArtContext } from "../../context/ArtContext"
import { features } from "../../config"
import { AiTypes as AiType } from "../../@types/shared"
import {
  AppBar,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material"

const Header: React.FC = () => {
  const artContext = React.useContext(ArtContext)

  const featureChangedHandler = (
    e: React.MouseEvent<HTMLElement>,
    aiType: AiType
  ) => {
    e.preventDefault()
    artContext.setAiType(aiType)
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
              value={artContext.aiType}
              exclusive
              onChange={featureChangedHandler}
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
