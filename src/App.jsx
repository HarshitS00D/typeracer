import React, { useState, useEffect } from "react"
import { Container, TextField, Divider, Box } from "@mui/material"
import RaceTrack from "./components/RaceTrack"

function App() {
  const [cursorPos, setCursorPos] = useState(0)
  const [errorLength, setErrorLength] = useState(0)
  const [paraRendered, setParaRendered] = useState()
  const [text, setText] = useState("")
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [timerId, setTimerId] = useState()
  const [isTyping, setIsTyping] = useState(false)
  const [para] = useState(
    "the middle of our life journey I found myself in a dark wood. I had wandered from the straight path. It isn't easy to talk about it: it was such a thick, wild, and rough forest that when I think of it my fear returns."
  )

  useEffect(() => {
    if (isTyping) {
      console.log("interval")

      const intervalId = setInterval(
        () => setSecondsPassed((prevSecondsPassed) => prevSecondsPassed + 1),
        1000
      )
      setTimerId(intervalId)

      return () => {
        console.log("clear interval")
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping])

  useEffect(() => {
    let textCovered = para.substring(0, cursorPos)
    let textError = para.substring(cursorPos, cursorPos + errorLength)
    let textUncovered = para.substring(cursorPos + errorLength)

    if (cursorPos === para.length) {
      console.log("completed")
      clearInterval(timerId)
    }

    let paraHtml = (
      <>
        <span style={{ color: "#91cf6b" }}>{textCovered}</span>
        <span style={{ backgroundColor: "#ea444a5f" }}>{textError}</span>
        {textUncovered}
      </>
    )
    setParaRendered(paraHtml)
  }, [cursorPos, errorLength, para, timerId])

  const handleChange = (e) => {
    let text = e.target.value

    if (!text || (text && para && text[0] !== para[0])) {
      setCursorPos(0)
      setText(text)
      return
    }

    for (let i = 0; i < text.length; i++) {
      if (!errorLength && text[i] === para[i]) {
        setCursorPos(i + 1)
      } else {
        setErrorLength(errorLength + 1)
      }
    }

    if (!isTyping) setIsTyping(true)
    setText(text)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && errorLength) {
      setErrorLength(errorLength - 1)
      setText(text.substring(0, text.length - 1))
      e.preventDefault()
    }
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <RaceTrack
        text={para}
        cursorPos={cursorPos}
        secondsPassed={secondsPassed}
        timerId={timerId}
      />

      <Divider variant="middle" style={{ margin: "20px 0 20px 0" }} />

      <Box sx={{ fontSize: 20 }}>{paraRendered}</Box>
      <TextField
        rows={4}
        fullWidth={true}
        variant="filled"
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        value={text}
        color="primary"
      />
    </Container>
  )
}

export default App
