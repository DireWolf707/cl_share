import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';

const Header = () => {
  return (
    <AppBar position="static" sx={{borderBottom: 'solid'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <ScreenShareOutlinedIcon fontSize='large'/>
          <Typography variant="h4" component="div" marginLeft={'8px'}>
            CL share
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
