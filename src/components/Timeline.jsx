import React, { useEffect, useState } from "react"

import { Paper, Button, ButtonGroup, Box } from "@mui/material"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import PauseRoundedIcon from "@mui/icons-material/PauseRounded"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

import { COLORS } from "../styles/colors"

function Timeline({ typingTimeline, text }) {
  const [cursorPos, setCursorPos] = useState(0)
  const [errorLength, setErrorLength] = useState(0)
  const [paraRendered, setParaRendered] = useState()
  const [isPaused, setIsPaused] = useState(true)
  const [timeoutIds, setTimeoutIds] = useState([])
  const [currentTimestamp, setCurrentTimestamp] = useState(
    typingTimeline.length > 0 ? typingTimeline[0].timestamp : null
  )
  const [wordBreakTimestamps] = useState(
    typingTimeline.filter((x) => x.key === " ")
  )

  const PlayTimeline = () => {
    if (!typingTimeline.length) return

    let currentTimestampIndex = typingTimeline.findIndex(
      (x) => x.timestamp === currentTimestamp
    )

    currentTimestampIndex =
      currentTimestampIndex > 0
        ? currentTimestampIndex + 1
        : currentTimestampIndex

    let startTime = currentTimestamp
    for (let i = currentTimestampIndex; i < typingTimeline.length; i++) {
      let delay = typingTimeline[i].timestamp - startTime

      let timeoutId = setTimeout(() => {
        setCursorPos(typingTimeline[i].cursorPos)
        setErrorLength(typingTimeline[i].errorLength)
        setCurrentTimestamp(typingTimeline[i].timestamp)
      }, delay)

      setTimeoutIds((prevTimeoutIds) => [...prevTimeoutIds, timeoutId])
    }
  }

  const RewindTimeline = () => {
    for (let i = 0; i < wordBreakTimestamps.length; i++) {
      if (wordBreakTimestamps[i].timestamp >= currentTimestamp) {
        let lastWord = wordBreakTimestamps[i > 0 ? i - 1 : i]
        setCurrentTimestamp(lastWord.timestamp)
        setCursorPos(lastWord.cursorPos)
        ClearAllTimeouts()
        break
      }
    }
  }

  const RestartTimeline = () => {
    if (!isPaused) setIsPaused(true)

    setCurrentTimestamp(typingTimeline[0].timestamp)
    setCursorPos(0)
    ClearAllTimeouts()
  }

  const ClearAllTimeouts = () => {
    timeoutIds.forEach((id) => clearInterval(id))
  }

  useEffect(() => {}, [])

  useEffect(() => {
    if (isPaused) {
      ClearAllTimeouts()
    } else {
      PlayTimeline()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  useEffect(() => {
    let beforeCursorText = text.substring(0, cursorPos)
    let afterCursorText = text.substring(cursorPos, text.length)

    let errorText = afterCursorText.substring(0, errorLength)
    let remainingText = afterCursorText.substring(
      errorLength,
      afterCursorText.length
    )

    setParaRendered(
      <>
        <span style={{}}>{beforeCursorText}</span>
        <span style={{ color: "#003fac" }}>|</span>
        <span style={{ backgroundColor: `${COLORS.RedError}` }}>
          {errorText}
        </span>
        <span style={{ color: "#8d8686" }}>{remainingText}</span>
      </>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPos, errorLength])

  return (
    <>
      <Paper
        elevation={1}
        sx={{ backgroundColor: "#a1d6fadc", padding: "0.3rem" }}
      >
        <Box>{paraRendered}</Box>
        <ButtonGroup
          sx={{ margin: "0.4rem" }}
          color="primary"
          variant="contained"
          size="small"
        >
          <Button onClick={RestartTimeline}>
            <RestartAltIcon />
          </Button>
          <Button onClick={RewindTimeline}>
            <ArrowLeftIcon />
          </Button>
          <Button onClick={() => setIsPaused((isPaused) => !isPaused)}>
            {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
          </Button>
          <Button>
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
      </Paper>
    </>
  )
}

export default Timeline
