import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "./components/game/Header"
import { Game } from "./pages/Game"
import { WordBattle } from "./pages/WordBattle"
import { RoomProvider } from "./context/RoomDataContext"

function App() {

  return (
    <BrowserRouter>
      <RoomProvider>
        <Header />

        <main className="h-full">
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/room/:roomkey" element={<WordBattle />} />
          </Routes>
        </main>
      </RoomProvider>
    </BrowserRouter>
  )
}

export default App
