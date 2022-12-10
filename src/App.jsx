import Header from "../components/Header"
import Box from "@mui/material/Box"
import Hero from "../components/Hero"
import Room from "../components/Room"
import { useState } from "react"

const STATE = {
  DASH: "dash",
  LAN: "lan",
  NET: "net",
}

const App = () => {
  const [view, setView] = useState(STATE.DASH)
  const [roomId, setRoomId] = useState(null)

  return (
    <Box sx={{ bgcolor: "dimgrey", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header setDash={() => setView(STATE.DASH)} />

      {view == STATE.DASH && (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: 3 / 4, height: "70%" }}>
            <Hero setNET={() => setView(STATE.NET)} setRoomId={setRoomId} />
          </Box>
        </Box>
      )}

      {view == STATE.NET && roomId && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Box sx={{ width: 1 / 2, minHeight: "max-content" }}>
            <Room roomId={roomId} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default App
