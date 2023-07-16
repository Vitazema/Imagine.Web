import "./App.css"

import ArtProvider from "./context/ArtContext"
import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import MainHeader from "./components/Header/MainHeader"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ArtDetail from "./components/ArtDetail/ArtDetail"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ArtProvider>
            <MainHeader />
          <Routes>
            <Route path="/" element={[<ArtForm />, <ArtGallery />]}></Route>
            <Route path="/gallery/:id" element={<ArtDetail art={undefined} submitted={() => {}} />}></Route>
          </Routes>
        </ArtProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
