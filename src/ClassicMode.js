import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const ClassicMode = () => {
  const [input, setInput] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [characters, setCharacters] = useState([])
  const [targetCharacter, setTargetCharacter] = useState(null)

  useEffect(() => {
    fetch("/characters.json")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data)
        setTargetCharacter(data[Math.floor(Math.random() * data.length)])
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei personaggi:", error)
      )
  }, [])

  const checkCharacter = () => {
    if (!input.trim()) return
    const character = characters.find(
      (c) => c.name.toLowerCase() === input.toLowerCase()
    )

    if (character) {
      setSelectedCharacter(character)
      setFeedback(compareCharacters(character, targetCharacter))
    } else {
      setSelectedCharacter(null)
      setFeedback(null)
    }
  }

  const compareCharacters = (guess, correct) => ({
    crew: guess.crew === correct.crew ? "green" : "red",
    haki: guess.haki === correct.haki ? "green" : "red",
    bounty: guess.bounty === correct.bounty ? "green" : "red",
    height: guess.height === correct.height ? "green" : "red",
  })

  return (
    <div
      className="container-fluid text-center"
      style={{
        backgroundImage: "url('/images/onepiece-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container-fluid d-flex justify-content-center">
          <a className="navbar-brand text-center fs-3" href="/">
            OnePiecedle Mockup
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 className="text-white">Indovina il personaggio di One Piece!</h1>
        <input
          type="text"
          className="form-control w-50 mx-auto mt-3"
          placeholder="Inserisci il nome del personaggio"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={checkCharacter}>
          Verifica
        </button>
        {selectedCharacter && feedback && (
          <div className="mt-4">
            <h2 className="text-white">{selectedCharacter.name}</h2>
            <div className="d-flex justify-content-center gap-3">
              <span
                style={{ backgroundColor: feedback.crew }}
                className="p-2 text-white"
              >
                {selectedCharacter.crew}
              </span>
              <span
                style={{ backgroundColor: feedback.haki }}
                className="p-2 text-white"
              >
                {selectedCharacter.haki ? "Haki: Sì" : "Haki: No"}
              </span>
              <span
                style={{ backgroundColor: feedback.bounty }}
                className="p-2 text-white"
              >
                Taglia: {selectedCharacter.bounty}
              </span>
              <span
                style={{ backgroundColor: feedback.height }}
                className="p-2 text-white"
              >
                Altezza: {selectedCharacter.height}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassicMode
