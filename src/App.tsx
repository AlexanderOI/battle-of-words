import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Game } from "./components/Game"

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
