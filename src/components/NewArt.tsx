import React from 'react';
import { useRef } from 'react'
import { ArtsContext } from '../context/ArtsContext';
import classes from './NewArt.module.css'

const NewArt: React.FC = () => {
    const artInputPromptRef = useRef<HTMLInputElement>(null);
    
    const artsContext = React.useContext(ArtsContext)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const enteredText = artInputPromptRef.current!.value

        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }

        artsContext.addArt(enteredText)
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Promtp</label>
            <input type="text" id="text" ref={artInputPromptRef} />
            <button>Create</button>
        </form>
    )
};

export default NewArt