import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ArtProvider } from "./context/ArtContext"
import { AuthProvider } from "./context/AuthContext"
import ArtDetail from "./components/Arts/ArtDetail"

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
            <Header />
            <Routes>
              <Route path="/" element={[<ArtForm key={1} />, <ArtGallery key={2} />]}></Route>
              <Route path="/gallery/:id" element={<ArtDetail />}></Route>
            </Routes>
          </ArtProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
