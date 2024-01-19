import ArtForm from "./components/ArtForm/ArtForm"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ArtProvider } from "./context/ArtContext"
import { UserProvider } from "./context/UserContext"
import ArtDetail from "./components/Arts/ArtDetail"
import ArtGrid from "./components/Arts/ArtGrid"
import ArtGallery from "./components/Arts/ArtGallery"

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
      <UserProvider>
        <BrowserRouter>
          <ArtProvider>
            <Header />
            <Routes>
              <Route path="/" element={[<ArtForm key={1} />, <ArtGrid key={2} />]}></Route>
              <Route path="/gallery" element={<ArtGallery />}></Route> 
              <Route path="/gallery/:id" element={<ArtDetail />}></Route>
            </Routes>
          </ArtProvider>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
