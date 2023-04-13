import React, { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"

function Timer({ secondsPassed }) {
  const [timer, setTimer] = useState("0:00")

  useEffect(() => {
    let minute = Math.floor(secondsPassed / 60) || 0
    let seconds = Math.round(secondsPassed % 60) || 0

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    setTimer(`${minute}:${seconds}`)
  }, [secondsPassed])

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography color={"grey"}>{timer}</Typography>
    </Box>
  )
}

export default Timer
