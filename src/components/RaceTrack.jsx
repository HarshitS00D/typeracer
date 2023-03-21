import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import SnowmobileIcon from "@mui/icons-material/Snowmobile"

function RaceTrack({ text, cursorPos, secondsPassed }) {
  const [progress, setProgress] = useState(0)
  const [wpm, setWpm] = useState(0)

  useEffect(() => {
    let currentProgress = (cursorPos / text.length) * 100
    setProgress(currentProgress)
  }, [text, cursorPos, setProgress])

  useEffect(() => {
    console.log("time: " + secondsPassed)

    let wpm = Math.ceil(cursorPos / 5 / (secondsPassed / 60))
    setWpm(wpm || 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsPassed])

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
        {wpm} wpm
      </Box>
    </Box>
  )
}

export default RaceTrack
