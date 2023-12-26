import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Header } from "./components/Header/Header"
import { Game } from "./pages/Game"
import { WordBattle } from "./pages/WordBattle"
import { RoomProvider } from "./context/RoomDataContext"
import { PlayerProvider } from "./context/PlayerDataContext"

function App() {

  return (
    <BrowserRouter>
      <RoomProvider>
        <Header />

        <main className="h-full">
          <PlayerProvider>
            <Routes>
              <Route path="/" element={<Game />} />
              <Route path="/room/:roomkey" element={<WordBattle />} />
            </Routes>

          </PlayerProvider>
        </main>
      </RoomProvider>
    </BrowserRouter>
  )
}

export default App
