import Txt2Img from "./components/Features/Txt2img"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import ArtDetail from "./components/Arts/ArtDetail"
import ArtGallery from "./components/Arts/ArtGallery"
import SignUp from "./components/Account/SignUp"
import { Profile } from "./components/Account/Profile"

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
            <Header />
            <Routes>
              <Route path="/" element={<Txt2Img />}/>
              <Route path="/signup" Component={SignUp}/>
              <Route path="/gallery" element={<ArtGallery />}></Route> 
              <Route path="/gallery/:id" element={<ArtDetail />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
