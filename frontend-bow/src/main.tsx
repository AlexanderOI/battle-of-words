import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from './context/SocketContext.tsx'
import { RoomCodeProvider } from './context/RoomCodeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <RoomCodeProvider>
      <App />
    </RoomCodeProvider>
  </SocketProvider>
)
