import React, { useEffect } from "react"
import { ArtContext } from "../../context/ArtContext"
import classes from "./ArtForm.module.css"
import { Art, ArtConfiguration } from "../../@types/Art"
import ValidationSummary from "../Common/ValidationSummary"
import { AxiosError } from "axios"
import Problem from "../../@types/problem"
import toBase64 from "../../utils/utils"
import {
  getAttachment,
  useUpsertAttachment,
} from "../../context/AttachmentHooks"
import { Attachment } from "../../@types/Attachment"
import { UserContext } from "../../context/UserContext"

const ArtForm: React.FC = () => {
  const artsContext = React.useContext(ArtContext)
  const userContext = React.useContext(UserContext)
  const [validationErrors, setValidationErrors] =
    React.useState<AxiosError<Problem>>()
  const [showAdvanced, setShowAdvanced] = React.useState(true)

  const upsertAttachments = useUpsertAttachment()

  const [configuration, setConfiguration] = React.useState<ArtConfiguration>(
    new ArtConfiguration("", 1)
  )

  useEffect(() => {
    localStorage.setItem(
      userContext.settings.selectedFeature.toString(),
      JSON.stringify(configuration)
    )
  }, [configuration])

  useEffect(() => {
    const storedConfiguration = fetchConfiguration()
    if (storedConfiguration) setConfiguration(storedConfiguration)
  }, [userContext.settings.selectedFeature])

  function fetchConfiguration(): ArtConfiguration | undefined {
    const selectedFeature = userContext.settings.selectedFeature
    const config = localStorage.getItem(selectedFeature.toString())
    if (config) {
      return JSON.parse(config)
    }
  }

  const onCreateHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    // don't reload page on submit
    e.preventDefault()

    const addArtMutationResult = artsContext.addArt(configuration)

    if (addArtMutationResult?.isError) {
      setValidationErrors(addArtMutationResult.error)
    } else {
      setConfiguration(new ArtConfiguration("", 1))
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
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const image = await toBase64(selectedFile)
      let attachment = new Attachment(
        selectedFile.name,
        selectedFile.type,
        selectedFile.type,
        image
      )
      let response = await upsertAttachments.mutateAsync(attachment)
      if (response.data) {
        attachment = response.data
      } else {
        setValidationErrors(response.data)
      }
      setConfiguration({
        ...configuration,
        image: image,
        attachmentId: attachment.id,
      })
    }
  }

  return (
    <section>
      <form className={classes.form}>
        <label htmlFor="text">Promtp</label>
        <input
          type="text"
          id="text"
          value={configuration.prompt}
          onChange={(e) =>
            setConfiguration({ ...configuration, prompt: e.target.value })
          }
        />
        <button
          type="submit"
          disabled={configuration.prompt.trim().length === 0}
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
              value={configuration.amount}
              onChange={(e) =>
                setConfiguration({
                  ...configuration,
                  amount: Number(e.target.value),
                })
              }
            ></input>
            <label>Negatives</label>
            <input
              type="text"
              value={configuration.negativePrompt || ""}
              onChange={(e) =>
                setConfiguration({
                  ...configuration,
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
              <img src={configuration.image} width={200} height={200} />
            </div>
          </div>
        )}
        {validationErrors && <ValidationSummary error={validationErrors} />}
      </form>
    </section>
  )
}

export default ArtForm
