import React from "react"

import { Stack, Box, Divider, Paper, Typography, Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

import { COLORS } from "../styles/colors"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const raceAgainBtnTheme = {
  backgroundColor: `${COLORS.lightgreen}`,
  color: `${COLORS.darkslategray}`,
  "&:hover": {
    backgroundColor: `${COLORS.darklightgreen}`,
  },
}

function Results({ mistakesCount, paraLength, speed, Reset }) {
  function renderAccuracy() {
    let accuracy = ((paraLength - mistakesCount) / paraLength) * 100
    return `${accuracy.toFixed(2)} %`
  }

  return (
    <>
      <Paper elevation={1} sx={{ backgroundColor: "#005995" }}>
        <Stack
          marginY={"1rem"}
          height="75px"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          divider={<Divider orientation="vertical" />}
          spacing={1}
        >
          <Box>
            <Typography color={"white"}>Speed: {speed} wpm</Typography>
          </Box>
          <Box>
            <Typography color={"white"}>
              Accuracy: {renderAccuracy()}
            </Typography>
          </Box>
          <Button sx={raceAgainBtnTheme} endIcon={<SendIcon />} onClick={Reset}>
            RACE AGAIN
          </Button>
        </Stack>
      </Paper>
    </>
  )
}

export default Results
