import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import SnowmobileIcon from "@mui/icons-material/Snowmobile"

function RaceTrack({ text, cursorPos, speed }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let currentProgress = (cursorPos / text.length) * 100
    setProgress(currentProgress)
  }, [text, cursorPos, setProgress])

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ flexGrow: 0.96, borderBottom: "2px dashed #ecca31" }}>
        <Box
          sx={{
            width: "40px",
            height: "20px",
            marginLeft: `${progress}%`,
            mb: 0.6,
          }}
        >
          <SnowmobileIcon color="primary" />
        </Box>
      </Box>
      <Box fontWeight={600} fontFamily="" mt={1} color="#366495e7">
        {speed} wpm
      </Box>
    </Box>
  )
}

export default RaceTrack
