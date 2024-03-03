import React, { useContext, useEffect, useRef, useState } from "react"
import classes from "../Arts/Creator.module.css"
import { Art, Parameters as Parameters } from "../../@types/Art"
import ValidationSummary from "../Common/ValidationSummary"
import toBase64 from "../../utils/utils"
import { useUpsertAttachment } from "../../context/AttachmentHooks"
import { Attachment } from "../../@types/Attachment"
import { UserContext } from "../../context/UserContext"
import { useAddArt } from "../../context/ArtHooks"
import { AiTypes } from "../../@types/shared"
import ArtFilter from "../Arts/ArtFilter"
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import "../Arts/ArtFilter.css"
import { Image } from "@mui/icons-material"

export default function Txt2Img(props: { onAddArt: (art: Art) => void }) {
  const userContext = useContext(UserContext)
  const [artState, setArtState] = useState<Art>(
    new Art(
      crypto.randomUUID(),
      userContext.settings?.selectedFeature,
      fetchParameters(),
      undefined,
      false
    )
  )

  const [configuration, setConfiguration] = useState<Parameters>(
    fetchParameters()
  )
  const [showAdvanced, setShowAdvanced] = useState(import.meta.env.DEV)

  const inputElement = useRef<HTMLInputElement>(null)

  const upsertAttachments = useUpsertAttachment()
  const addArtMutation = useAddArt()

  useEffect(() => {
    inputElement.current?.focus()
  }, [])

  useEffect(() => {
    localStorage.setItem(
      AiTypes[userContext.settings.selectedFeature],
      JSON.stringify(configuration)
    )
  }, [configuration])

  useEffect(() => {
    const storedConfiguration = fetchParameters()
    if (storedConfiguration) setConfiguration(storedConfiguration)
  }, [userContext.settings.selectedFeature])

  function fetchParameters(): Parameters {
    const selectedFeature = userContext.settings.selectedFeature
    const config = localStorage.getItem(AiTypes[selectedFeature])
    if (config) {
      return JSON.parse(config)
    } else {
      return new Parameters("", 1)
    }
  }

  const createArtHandler: React.MouseEventHandler<HTMLButtonElement> = async (
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

    props.onAddArt(art)
    const result = await addArtMutation.mutateAsync(art)
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
      const response = await upsertAttachments.mutateAsync(attachment)
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

  function clearParametersHandler() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all parameters?"
    )
    if (confirmed) {
      setConfiguration(new Parameters("", 1))
    }
  }

  return (
    <>
      <form>
        <TextField
          id="input-with-icon-textfield"
          label="Prompt"
          value={configuration.prompt}
          multiline
          maxRows={5}
          onChange={(e) =>
            setConfiguration({ ...configuration, prompt: e.target.value })
          }
          ref={inputElement}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  onChange={onFileSelected}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Image />
                  </IconButton>
                </label>
              </InputAdornment>
            ),
          }}
        />
        {configuration.image && (
          <div className={classes.preview}>
            <img src={configuration.image} width={200} height={200} />
          </div>
        )}
        {showAdvanced && (
          <div className={classes.form}>
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
          </div>
        )}
        <div className="art-create">
          <div>
            <Button
              variant="contained"
              type="submit"
              disabled={configuration.prompt.trim().length === 0}
              onClick={createArtHandler}
            >
              Create
            </Button>
            <Button
              onClick={showAdvancedHandler}
              className={showAdvanced === true ? "clicked" : ""}
            >
              Advanced
            </Button>
          </div>
          <ArtFilter clearParameters={clearParametersHandler} />
        </div>
      </form>
      {addArtMutation.isError && (
        <ValidationSummary error={addArtMutation.error} />
      )}
    </>
  )
}
