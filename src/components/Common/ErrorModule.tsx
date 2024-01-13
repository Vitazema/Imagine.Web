import "./ErrorModule.css"

function ErrorModule(props: {message:string}) {
  return (
    <div className="error">
      <h2>An error have occured:</h2>
      {props.message}
    </div>
  )
}

export default ErrorModule