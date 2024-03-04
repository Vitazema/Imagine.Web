import Txt2Img from "./components/Features/Txt2img"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import ArtDetail from "./components/Arts/ArtDetail"
import Gallery from "./components/Arts/Gallery"
import SignUp from "./components/Account/SignUp"
import { Dashboard } from "./components/Account/Dashboard"
import { Footer } from "./components/Common/Footer"
import { About } from "./components/Common/About"
import { Checkout } from "./components/Payment/Checkout"
import Creator from "./components/Arts/Creator"
import PageNotFound from "./components/Common/NotFound"
import Home from "./components/Common/Home"
import { ThemeProvider, createTheme } from "@mui/material"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const theme = createTheme({
  palette: {
    background: {
      default: "#EEEEEE",
      paper: "#EEEEEE",
    },
    primary: {
      main: "#00ADB5",
      light: "#393e46",
      dark: "#1e2127",
      contrastText: "#eeeeee",
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Creator />} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/gallery" element={<Gallery />}></Route>
              <Route path="/gallery/:id" element={<ArtDetail />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
