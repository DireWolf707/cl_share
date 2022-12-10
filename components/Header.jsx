import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined"
import Button from "@mui/material/Button"

const Header = ({ setDash }) => {
  return (
    <AppBar position="static" sx={{ borderBottom: "solid" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Button
            onClick={setDash}
            variant="text"
            size="" // will be decided by sx property
            color="inherit"
            startIcon={<ScreenShareOutlinedIcon fontSize="large" />}
            sx={{ fontSize: "22px" }}
            fontSize
          >
            CL share
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
