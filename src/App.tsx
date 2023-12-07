import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "./components/game/Header"
import { Game } from "./pages/Game"
import { WordBattle } from "./pages/WordBattle"

function App() {

  return (
    <BrowserRouter>
      <Header />

      <main className="h-full">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/room/:roomkey" element={<WordBattle />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
