import { AxiosError } from "axios"
import Problem from "../../@types/problem"

type Args = {
  error: AxiosError<Problem>
}

const ValidationSummary: React.FC<Args> = ({ error }) => {
  if (error.response?.status !== 400) return <></>
  const errors = error.response?.data.errors

  return (
    <>
      <div className="alert alert-danger">Please fix the following:</div>
      <div>
        {errors.map((value, index) => {
          return (
            <ul key={index}>
              <li>{value}</li>
            </ul>
          )
        })}
      </div>
    </>
  )
}

export default ValidationSummary
