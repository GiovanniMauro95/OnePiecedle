import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import HomePage from "./HomePage"
import ClassicMode from "./ClassicMode"
import FruitMode from "./FruitMode"
import { GameProvider } from "./GameContext"

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/classic" element={<ClassicMode />} />
          <Route path="/frutto-del-diavolo" element={<FruitMode />} />
        </Routes>
      </Router>
    </GameProvider>
  )
}

export default App
