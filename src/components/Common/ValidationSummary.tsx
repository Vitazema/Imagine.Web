import { AxiosError } from "axios"
import Problem from "../../@types/problem"
import Alert from "@mui/material/Alert"

type Args = {
  error: AxiosError<Problem>
}

const ValidationSummary: React.FC<Args> = ({ error }) => {
  if (error.response?.status !== 400) return null
  const errors = error.response?.data.errors

  return (
    <Alert severity="warning">
      <h4>Please fix the following:</h4>
      {errors.map((value, index) => (
        <ul key={index}>
          <li>{value}</li>
        </ul>
      ))}
    </Alert>
  )
}

export default ValidationSummary
