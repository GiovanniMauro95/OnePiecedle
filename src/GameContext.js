import React, { createContext, useContext, useState, useEffect } from "react"

const GameContext = createContext()

export const useGame = () => useContext(GameContext)

export const GameProvider = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
  const classicKey = `tentativi-Classic-${loggedUser?.nickname}`
  const fruitKey = `tentativi-Fruit-${loggedUser?.nickname}`

  const [classicGuesses, setClassicGuesses] = useState(() => {
    const saved = localStorage.getItem(classicKey)
    return saved ? JSON.parse(saved) : []
  })

  const [fruitGuesses, setFruitGuesses] = useState(() => {
    const saved = localStorage.getItem(fruitKey)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem(classicKey, JSON.stringify(classicGuesses))
      localStorage.setItem(fruitKey, JSON.stringify(fruitGuesses))
    }
  }, [classicGuesses, fruitGuesses])

  return (
    <GameContext.Provider
      value={{
        classicGuesses,
        setClassicGuesses,
        fruitGuesses,
        setFruitGuesses,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
