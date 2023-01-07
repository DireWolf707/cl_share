import React, { useState } from "react"
import { db, timestamp } from "../firebase/config"
import { doc, setDoc, getDoc } from "firebase/firestore"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import { genRandomId } from "../utils"

const Hero = ({ setNET, setRoomId }) => {
  const [joinRoomId, setJoinRoomId] = useState("")
  const [joinRoomIdError, setjoinRoomIdError] = useState(false)
  const [joinRoomIdErrorInfo, setJoinRoomIdErrorInfo] = useState("")

  const createRoom = async () => {
    try {
      const createdAt = timestamp.fromDate(new Date())
      const _roomId = genRandomId(6)
      const docRef = doc(db, "rooms", _roomId)
      await setDoc(docRef, { createdAt, files: [] })
      setRoomId(_roomId)
      setNET()
    } catch (err) {
      console.log(err)
    }
  }

  const joinRoom = async () => {
    if (joinRoomId.length != 6) {
      setjoinRoomIdError(true)
      setJoinRoomIdErrorInfo("Room Id must be of length 6")
      return
    }
    try {
      const docRef = doc(db, "rooms", joinRoomId)
      const room = await getDoc(docRef)
      if (room.exists()) {
        // console.log(room.data())
        setRoomId(joinRoomId)
        setNET()
      } else {
        setjoinRoomIdError(true)
        setJoinRoomIdErrorInfo("Room Id does not exist")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Paper
      elevation={5}
      sx={{
        height: "100%",
        width: 2/3,
        border: "solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} sx={{ bgcolor: "green", width: "70%", height: "70%" }}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h3" component="h3" sx={{ color: "whitesmoke" }}>
            Room Connect
          </Typography>
          <Button onClick={createRoom} variant="contained" color="check" size="large" sx={{ px: 3.2, py: 1.2, mt: 3.5 }}>
            Create Room
          </Button>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "70%",
              mt: 2.2,
              bgcolor: "#E8E6E5",
              px: 0.8,
              py: 1,
            }}
          >
            <TextField
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              label="Room Code"
              variant="filled"
              type="text"
              size="small"
              color="error"
              error={joinRoomIdError}
              helperText={joinRoomIdErrorInfo}
            />

            <Button onClick={joinRoom} variant="contained" color="check" size="large">
              Join Room
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Paper>
  )
}

export default Hero
