import React from "react";
import { useRef } from "react";
import { ArtsContext } from "../../context/ArtsContext";
import { Prompt } from "../../models/Art";
import classes from "./ArtForm.module.css";

const NewArt: React.FC = () => {
  const artInputPromptRef = useRef<HTMLInputElement>(null);
  const artsContext = React.useContext(ArtsContext);

  const [showAdvanced, setShowAdvanced] = React.useState(true);
  const [userInput, setUserInput] = React.useState({
    amount: "",
    negativePrompt: "",
  });

  const submitHandler = (event: React.FormEvent) => {
    // don't reload page on submit
    event.preventDefault();

    const enteredPrompt = new Prompt(
      artInputPromptRef.current!.value,
      userInput.negativePrompt,
      Number(userInput.amount)
    );

    if (enteredPrompt.textPrompt.trim().length === 0) {
      // throw an error
      return;
    }

    artsContext.addArt(enteredPrompt);

    // refresh user input
    setUserInput({
      amount: "1",
      negativePrompt: "",
    });
  };

  const showAdvancedHandler = () => {
    setShowAdvanced(!showAdvanced);
  };

  const amountChangeHandler = (event: any) => {
    setUserInput((currentState) => {
      return { ...currentState, amount: event.target.value };
    });
    console.log(event.target.value);
  };

  const negativePromptHandler = (event: any) => {
    setUserInput({
      ...userInput,
      negativePrompt: event.target.value,
    });
    console.log(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Promtp</label>
      <input type="text" id="text" ref={artInputPromptRef} />
      <button type="submit">Create</button>
      <button onClick={showAdvancedHandler} type="button">Advanced</button>
      <div style={{display: showAdvanced ? "block" : "none"}}>
        <input
          onChange={amountChangeHandler}
          value={userInput.amount}
          type="number"
          min="1"
          step="1"
          max="4"
        ></input>
        <input
          onChange={negativePromptHandler}
          value={userInput.negativePrompt}
          type="text"
        ></input>
      </div>
    </form>
  );
};

export default NewArt;
