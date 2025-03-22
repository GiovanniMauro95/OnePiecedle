import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import ClassicMode from "./ClassicMode"
import FruitMode from "./FruitMode"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classic" element={<ClassicMode />} />
        <Route path="/frutto-del-diavolo" element={<FruitMode />} />
      </Routes>
    </Router>
  )
}

export default App
