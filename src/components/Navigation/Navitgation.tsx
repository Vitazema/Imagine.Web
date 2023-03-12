import React from "react"
import { ArtContext } from "../../context/ArtContext"
import "./Navigation.module.css"

function Navigation() {
  const artContext = React.useContext(ArtContext)
  const [selected, setSelected] = React.useState(artContext.features[0])

  const selectCategoryHandler = (selectedCategory: string) => {
    setSelected(selectedCategory)
  }

  return (
    <>
      {artContext.features.map((feature) => {
        return (
          <button
            onClick={() => selectCategoryHandler(feature)}
            className={selected == feature ? "clicked" : ""}
            key={Math.random().toString()}
          >
            {feature}
          </button>
        )
      })}
    </>
  )
}

export default Navigation
