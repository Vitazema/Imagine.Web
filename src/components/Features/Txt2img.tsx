import React, { useEffect } from "react"
import classes from "./ArtForm.module.css"
import { Art, ArtConfiguration } from "../../@types/Art"
import ValidationSummary from "../Common/ValidationSummary"
import toBase64 from "../../utils/utils"
import {
  useUpsertAttachment,
} from "../../context/AttachmentHooks"
import { Attachment } from "../../@types/Attachment"
import { UserContext } from "../../context/UserContext"
import { ArtGrid } from "../Arts/ArtGrid"
import { Role } from "../../@types/User"
import { useAddArt } from "../../context/ArtHooks"

const Txt2Img: React.FC = () => {
  const userContext = React.useContext(UserContext)
  const [artState, setArtState] = React.useState<Art>(new Art(
    crypto.randomUUID(),
    userContext.settings?.selectedFeature,
    new ArtConfiguration("", 1),
    undefined,
    false
  ))
  const [configuration, setConfiguration] = React.useState<ArtConfiguration>(
    new ArtConfiguration("", 1)
  )
  const [showAdvanced, setShowAdvanced] = React.useState(
    userContext.currentUser?.role === Role.System ? true : false
  )

  const upsertAttachments = useUpsertAttachment()
  const addArtMutation = useAddArt()

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

  const onCreateArtHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault()

    const art = new Art(
      crypto.randomUUID(),
      userContext.settings?.selectedFeature,
      configuration,
      configuration.prompt,
      false
    )

    const result = await addArtMutation.mutateAsync(art)

    if (addArtMutation?.isSuccess) {
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
        setConfiguration({
          ...configuration,
          image: image,
          attachmentId: attachment.id,
        })
      }
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
          onClick={onCreateArtHandler}
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
      </form>
      {addArtMutation.isError && (
        <ValidationSummary error={addArtMutation.error} />
      )}
      <ArtGrid submitted={(a) => {addArtMutation.mutate(a)}} />
    </section>
  )
}

export default Txt2Img
