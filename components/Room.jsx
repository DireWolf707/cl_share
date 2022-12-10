import { db, timestamp, storage } from "../firebase/config"
import { doc, setDoc, arrayUnion, onSnapshot } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Chip from '@mui/material/Chip';
import FileUploadIcon from "@mui/icons-material/FileUpload"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { useRef, useState, useEffect } from "react"
import { formatBytes } from "../utils"

const Room = ({ roomId }) => {
  const inputRef = useRef()
  const [files, setFiles] = useState([])

  useEffect(() => {
    const docRef = doc(db, "rooms", roomId)
    const unsub = onSnapshot(
      docRef,
      (snapshot) => setFiles([...snapshot.data().files]),
      (error) => {
        console.log(err.message)
      }
    )
    return unsub
  }, [])

  const handleFileChange = async (e) => {
    try {
      const targetFile = e.target.files[0]
      // upload file
      const filePath = `files/${roomId}/${targetFile.name}` // set directory for files on cloud
      const fileRef = ref(storage, filePath) // create local ref of file
      const file = await uploadBytes(fileRef, targetFile) // upload file and get ref on cloud
      const fileUrl = await getDownloadURL(file.ref) // get download url from ref on cloud
      console.log("file uploaded")
      const docRef = doc(db, "rooms", roomId)
      await setDoc(
        docRef,
        {
          files: arrayUnion({
            fileName: targetFile.name,
            type: targetFile.type,
            size: targetFile.size,
            url: fileUrl,
            uploadTime: timestamp.fromDate(new Date()),
          }),
        },
        { merge: true }
      )
      console.log("doc updated")
    } catch (err) {
      console.log(err)
    } finally {
      inputRef.current.value = ""
    }
  }

  return (
    <Paper
      elevation={5}
      sx={{
        height: "100%",
        width: 1,
        border: "solid",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 2 }}>
        <Chip label={`Room ID : ${roomId}`} size="medium" />
        <Button variant="contained" component="label" size="large" endIcon={<FileUploadIcon />}>
          Upload Files
          <input ref={inputRef} onChange={handleFileChange} hidden type="file" />
        </Button>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ mx: 3, my: 2 }}>
        {files.length > 0 &&
          files.map((file) => (
            <Paper
              key={file.url}
              variant="outlined"
              elevation={10}
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#505A62", mt: 0.8, px: 1, color:"#ECF9FD" }}
            >
              <Typography>
                {file.fileName} ({formatBytes(file.size)})
              </Typography>

              <IconButton href={file.url} download={file.fileName} target="_blank" size="large" color="success">
                <FileDownloadIcon sx={{color: '#ECF9FD'}} />
              </IconButton>
            </Paper>
          ))}
        {files.length == 0 && (
          <Typography align="center" variant="h6">
            No File Uploaded!
          </Typography>
        )}
      </Box>
    </Paper>
  )
}

export default Room
