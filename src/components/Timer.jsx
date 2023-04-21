import React from "react"

import { Box, Typography } from "@mui/material"

function Timer({ secondsPassed }) {
  const renderTimer = () => {
    let minute = Math.floor(secondsPassed / 60) || 0
    let seconds = Math.round(secondsPassed % 60) || 0

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    return `${minute}:${seconds}`
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography color={"grey"}>{renderTimer()}</Typography>
    </Box>
  )
}

export default Timer
