import "./App.css"

import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import MainHeader from "./components/Header/MainHeader"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ArtDetail from "./components/ArtDetail/ArtDetail"
import { ArtProvider } from "./context/ArtContext"
import { AuthProvider } from "./context/AuthContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ArtProvider>
            <MainHeader />
            <Routes>
              <Route
                path="/"
                element={[<ArtForm key={1} />, <ArtGallery key={2} />]}
              ></Route>
              <Route path="/gallery/:id" element={<ArtDetail />}></Route>
            </Routes>
          </ArtProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
