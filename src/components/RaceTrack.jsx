import React from "react"

import { Box } from "@mui/material"
import SnowmobileIcon from "@mui/icons-material/Snowmobile"

function RaceTrack({ text, cursorPos, speed }) {
  let raceProgress = (cursorPos / text.length) * 100

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ flexGrow: 0.96, borderBottom: "2px dashed #ecca31" }}>
        <Box
          sx={{
            width: "40px",
            height: "20px",
            marginLeft: `${raceProgress}%`,
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
