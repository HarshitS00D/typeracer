import React, { useState, useEffect } from "react"

import { Container, TextField, Divider, Box } from "@mui/material"

import { COLORS } from "./styles/colors"
import RaceTrack from "./components/RaceTrack"
import Results from "./components/Results"
import Timer from "./components/Timer"
import Timeline from "./components/Timeline"

function App() {
  const [cursorPos, setCursorPos] = useState(0)
  const [errorLength, setErrorLength] = useState(0)
  const [text, setText] = useState("")
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [timerId, setTimerId] = useState() // This does not need to be a state and can be accomplished by a variable also.
  const [mistakesCount, setMistakesCount] = useState(0)
  const [typingTimeline, setTypingTimeline] = useState([])
  const [para] = useState(
    // This too can be moved outside state till we don't have API to get random paragraphs from.
    "the middle of our life journey I found myself in a dark wood."
  )
  // "the middle of our life journey I found myself in a dark wood. I had wandered from the straight path. It isn't easy to talk about it: it was such a thick, wild, and rough forest that when I think of it my fear returns."

  const isTyping = cursorPos > 0 && cursorPos < para.length

  const renderParagraph = () => {
    let textCovered = para.substring(0, cursorPos)
    let textError = para.substring(cursorPos, cursorPos + errorLength)
    let textUncovered = para.substring(cursorPos + errorLength)

    return (
      <>
        <span style={{ color: "#79ca4adf" }}>{textCovered}</span>
        <span style={{ backgroundColor: `${COLORS.RedError}` }}>
          {textError}
        </span>
        {textUncovered}
      </>
    )
  }

  const GetCurrentSpeed = () => {
    // If secondsPassed is zero then return zero
    let wpm = secondsPassed
      ? Math.ceil(cursorPos / 5 / (secondsPassed / 60)) || 0
      : 0
    return wpm
  }

  const speed = GetCurrentSpeed()

  useEffect(() => {
    if (isTyping) {
      const intervalId = setInterval(() => {
        setSecondsPassed((prevSecondsPassed) => prevSecondsPassed + 1)
      }, 1000)
      setTimerId(intervalId)

      return () => {
        console.log("clear interval")
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping])

  useEffect(() => {
    if (cursorPos === para.length) {
      clearInterval(timerId)
    }

    if (isTyping) {
      let currentSpeed = GetCurrentSpeed()

      setTypingTimeline([
        ...typingTimeline,
        {
          timestamp: Date.now(),
          key: text[cursorPos - 1], // cursorPos - 1: as cursor is ahead of text length
          cursorPos,
          errorLength,
          speed: currentSpeed,
        },
      ])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPos, errorLength])

  const handleChange = (e) => {
    let text = e.target.value
    setText(text)

    if (!text || (text && para && text[0] !== para[0])) {
      setCursorPos(0)
      return
    }

    if (text[cursorPos] === para[cursorPos]) {
      setCursorPos((prevCursorPos) => prevCursorPos + 1)
    } else {
      setMistakesCount((prevMistakesCount) => prevMistakesCount + 1)
      setErrorLength((prevErrorLength) => prevErrorLength + 1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && errorLength) {
      e.preventDefault()

      setErrorLength(errorLength - 1)
      setText(text.substring(0, text.length - 1))
    }
  }

  const Reset = () => {
    setCursorPos(0)
    setSecondsPassed(0)
    setMistakesCount(0)
    setTypingTimeline([])
    setText("")
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Timer secondsPassed={secondsPassed} />
      <RaceTrack text={para} cursorPos={cursorPos} speed={speed} />

      <Divider variant="middle" style={{ margin: "20px 0 20px 0" }} />

      <Box sx={{ fontSize: 20 }}>{renderParagraph()}</Box>
      <TextField
        rows={4}
        fullWidth={true}
        variant="filled"
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        value={text}
        color="primary"
        autoComplete="off"
        focused={true}
        disabled={cursorPos === para.length}
      />

      {!isTyping && secondsPassed ? (
        <>
          <Results
            mistakesCount={mistakesCount}
            paraLength={para.length}
            speed={speed}
            Reset={Reset}
          />
          <Timeline text={text} typingTimeline={typingTimeline} />
        </>
      ) : null}
    </Container>
  )
}

export default App
