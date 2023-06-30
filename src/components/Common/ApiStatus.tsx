import ErrorModule from "../UI/ErrorModule";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
  Error = "error"
}

export const ApiStatus = (props: {status:  Status})  => {
  switch (props.status) {
    case Status.Loading:
      return <div>Loading...</div>;
    case Status.Failed || Status.Idle:
      return <ErrorModule message="Error communicating with backend"/>;
    case Status.Error:
      return <ErrorModule message="Unexpected server error."/>
    default:
      return <ErrorModule message="Unknown error has occured."/>
  }
}