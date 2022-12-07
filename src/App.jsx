import Header from "../components/Header"
import Box from "@mui/material/Box"
import Hero from "../components/Hero"

const App = () => {
  return (
    <Box sx={{ bgcolor: "dimgrey", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ bgcolor: "dimgrey", flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Hero />
      </Box>
    </Box>
  )
}

export default App
