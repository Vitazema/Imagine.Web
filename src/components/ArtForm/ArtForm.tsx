import React from "react"
import { ArtContext } from "../../context/ArtContext"
import classes from "./ArtForm.module.css"
import { Art, ArtSettings } from "../../@types/Art"
import { useAddArt } from "../../context/ArtHooks"

const ArtForm: React.FC = () => {
  const artsContext = React.useContext(ArtContext)

  const [settingsState, setSettingsState] = React.useState<ArtSettings>(
    new ArtSettings("", "", 0)
  )

  // const promptRef = React.useRef<HTMLInputElement>(null)
  // const negativePromptRef = React.useRef<HTMLInputElement>(null)
  // const amountRef = React.useRef<HTMLInputElement>(null)

  const [showAdvanced, setShowAdvanced] = React.useState(true)

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    // don't reload page on submit
    e.preventDefault()
    artsContext.submitArt(settingsState)

    // const enteredPrompt = new ArtSettings(
    //   promptRef.current!.value,
    //   negativePromptRef.current?.value ?? "",
    //   Number(amountRef.current?.value)
    // )

    if (settingsState?.textPrompt.trim().length === 0) {
      // throw an error
      return
    }

    // refresh user input
    // if (promptRef.current != null) promptRef.current.value = ""

    // if (negativePromptRef.current != null) negativePromptRef.current.value = ""
  }

  const showAdvancedHandler = () => {
    setShowAdvanced(!showAdvanced)
  }

  return (
    <section>
      <form className={classes.form}>
        <label htmlFor="text">Promtp</label>
        <input
          type="text"
          id="text"
          value={settingsState.textPrompt}
          onChange={(e) =>
            setSettingsState({...settingsState, textPrompt : e.target.value})}
        />
        <button
          type="submit"
          disabled={
            settingsState.textPrompt.trim().length === 0
          }
          onClick={onSubmit}
        >
          Create
        </button>
        <button
          onClick={showAdvancedHandler}
          className={showAdvanced === true ? "clicked" : ""}
        >
          Advanced
        </button>
        {showAdvanced && (
          <div>
            <label>Number</label>
            <input
              title="asdsd"
              type="number"
              min="1"
              step="1"
              max="4"
              // ref={amountRef}
            ></input>
            <label>Negatives</label>
            {/* <input type="text" ref={negativePromptRef}></input> */}
          </div>
        )}
      </form>
    </section>
  )
}

export default ArtForm
