import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import ClassicMode from "./ClassicMode"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classic" element={<ClassicMode />} />
      </Routes>
    </Router>
  )
}

export default App
