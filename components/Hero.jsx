import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"

const Hero = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        height: "70%",
        minWidth: 4 / 5,
        border: "solid",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} sx={{ bgcolor: "green", width: 3 / 7, height: "70%" }}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h3" component="h3" sx={{ color: "whitesmoke" }}>
            LAN Connect
          </Typography>
          <Button variant="contained" color="check" size="large" sx={{ px: 3.2, py: 1.2, mt: 2 }}>
            Check
          </Button>
          <Typography variant="body1" component="p" sx={{ color: "whitesmoke", mt: 1.2 }}>
            This feature will be added soon!
          </Typography>
        </Box>
      </Paper>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Paper elevation={10} sx={{ bgcolor: "green", width: 3 / 7, height: "70%" }}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h3" component="h3" sx={{ color: "whitesmoke" }}>
            NET Connect
          </Typography>
          <Button variant="contained" color="check" size="large" sx={{ px: 3.2, py: 1.2, mt: 3.5 }}>
            Create Room
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "70%", mt: 2.2 }}>
            <Box sx={{ bgcolor: "#D5D1D0" }}>
              <TextField label="Room Code" variant="filled" type="text" size="small" color="error" />
            </Box>
            <Button variant="contained" color="check" size="large" sx={{ px: 3.2, py: 1.2 }}>
              Join Room
            </Button>
          </Box>
        </Box>
      </Paper>
    </Paper>
  )
}

export default Hero
