import ReactDOM from "react-dom/client"

import "./index.css"
import App from "./App"
import AuthProvider from "./context/AuthContext"
import React from "react"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
