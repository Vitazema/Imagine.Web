import Txt2Img from "./components/Features/Txt2img"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import ArtDetail from "./components/Arts/ArtDetail"
import Gallery from "./components/Arts/Gallery"
import SignUp from "./components/Account/SignUp"
import { Profile } from "./components/Account/Profile"
import { Footer } from "./components/Common/Footer"
import { About } from "./components/Common/About"
import { Checkout } from "./components/Payment/Payment"
import Creator from "./components/Arts/Creator"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Creator />} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/gallery/:id" element={<ArtDetail />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
