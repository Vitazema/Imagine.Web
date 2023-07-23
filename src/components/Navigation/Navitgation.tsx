import React from "react"
import { ArtContext } from "../../context/ArtContext"
import "./Navigation.module.css"
import { features } from "../../config"
import { Features } from "../../@types/shared"

function Navigation() {
  const artContext = React.useContext(ArtContext)

  const onSelectHandler = (feature: Features) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    artContext.setAiType(feature)
  }

  return (
    <div>
      {features.map((feature) => {
        return (
          <button
            type="button"
            onClick={onSelectHandler(feature)}
            className={artContext.aiType === feature ? "clicked" : ""}
            key={Math.random().toString()}
          >
            {Features[feature]}
          </button>
        )
      })}
    </div>
  )
}

export default Navigation
