import { BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header"
import { Games } from "./components/Games"

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div>
        <Games />
      </div>
    </BrowserRouter>
  )
}

export default App
