import React from "react"
import { ArtContext } from "../../context/ArtContext"
import classes from "./ArtForm.module.css"
import { Art, ArtSettings } from "../../@types/Art"
import { useAddArt } from "../../context/ArtHooks"
import ValidationSummary from "../Common/ValidationSummary"
import { AxiosError } from "axios"
import Problem from "../../@types/problem"
import toBase64 from "../Common/utils"

const ArtForm: React.FC = () => {
  const artsContext = React.useContext(ArtContext)
  const [settingsState, setSettingsState] = React.useState<ArtSettings>(
    new ArtSettings("", 1)
  )
  const [validationErrors, setValidationErrors] =
    React.useState<AxiosError<Problem>>()
  const [showAdvanced, setShowAdvanced] = React.useState(true)

  const onCreateHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    // don't reload page on submit
    e.preventDefault()

    const addArtMutationResult = artsContext.addArt(settingsState)

    if (addArtMutationResult?.isError) {
      setValidationErrors(addArtMutationResult.error)
    } else {
      setSettingsState(new ArtSettings("", 1))
    }
  }

  const showAdvancedHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault()
    setShowAdvanced(!showAdvanced)
  }

  const onFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault()
    e.target.files &&
      e.target.files[0] &&
      setSettingsState({
        ...settingsState,
        image: await toBase64(e.target.files[0]),
      })
  }

  return (
    <section>
      <form className={classes.form}>
        <label htmlFor="text">Promtp</label>
        <input
          type="text"
          id="text"
          value={settingsState.prompt}
          onChange={(e) =>
            setSettingsState({ ...settingsState, prompt: e.target.value })
          }
        />
        <button
          type="submit"
          disabled={settingsState.prompt.trim().length === 0}
          onClick={onCreateHandler}
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
            <label>Amount</label>
            <input
              type="number"
              min="1"
              step="1"
              max="4"
              value={settingsState.amount}
              onChange={(e) =>
                setSettingsState({
                  ...settingsState,
                  amount: Number(e.target.value),
                })
              }
            ></input>
            <label>Negatives</label>
            <input
              type="text"
              value={settingsState.negativePrompt || ""}
              onChange={(e) =>
                setSettingsState({
                  ...settingsState,
                  negativePrompt: e.target.value,
                })
              }
            ></input>
            <div className="form-group mt-2">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                className="form-control"
                onChange={onFileSelected}
              />
            </div>
            <div className="mt-2">
              <img src={settingsState.image} alt="preview" 
              width={200}
              height={200}
              />
            </div>
          </div>
        )}
        {validationErrors && <ValidationSummary error={validationErrors} />}
      </form>
    </section>
  )
}

export default ArtForm
