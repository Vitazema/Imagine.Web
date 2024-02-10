import { Button, Grid } from "@mui/material"
import { useState } from "react"
import "./Payment.css"

const messages = [
  "Enter your shipping address",
  "Enter your billing information",
  "Review your order",
]

export function Checkout() {
  const [step, setStep] = useState(1)

  return (
    <div className="steps">
      <h1>Checkout</h1>
      <p>
        Step {step} : {messages[step - 1]}
      </p>
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <div>
        <Button
          variant="contained"
          onClick={() => {
            step > 1 ? setStep(step - 1) : null
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            step < 3 ? setStep(step + 1) : null
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
