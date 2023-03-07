import React from "react";
import { useRef } from "react";
import { ArtContext } from "../../context/ArtContext";
import { Prompt } from "../../models/Art";
import classes from "./ArtForm.module.css";

const NewArt: React.FC = () => {

  const artsContext = React.useContext(ArtContext);

  const promptRef = React.useRef<HTMLInputElement>(null);
  const negativePromptRef = React.useRef<HTMLInputElement>(null)
  const amountRef = React.useRef<HTMLInputElement>(null)

  const [showAdvanced, setShowAdvanced] = React.useState(true);

  const submitHandler = (event: React.FormEvent) => {
    // don't reload page on submit
    event.preventDefault();

    const enteredPrompt = new Prompt(
      promptRef.current!.value,
      negativePromptRef.current!.value,
      Number(amountRef.current!.value)
    );

    if (enteredPrompt.textPrompt.trim().length === 0) {
      // throw an error
      return;
    }

    artsContext.addArt(enteredPrompt);
    
    // refresh user input
    promptRef.current!.value = ''
    negativePromptRef.current!.value = ''
  };

  const showAdvancedHandler = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Promtp</label>
      <input type="text" id="text" ref={promptRef} />
      <button type="submit">Create</button>
      <button onClick={showAdvancedHandler} type="button">
        Advanced
      </button>
      {showAdvanced && (
        <div>
          <input
            type="number"
            min="1"
            step="1"
            max="4"
            ref={amountRef}
          ></input>
          <input
            type="text"
            ref={negativePromptRef}
          ></input>
        </div>
      )}
    </form>
  );
};

export default NewArt;
