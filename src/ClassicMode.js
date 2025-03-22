import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const ClassicMode = () => {
  const [characters, setCharacters] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [guesses, setGuesses] = useState([])
  const [targetCharacter, setTargetCharacter] = useState(null)
  const [victory, setVictory] = useState(false)

  useEffect(() => {
    fetch("/characters.json")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data)
        const today = new Date().toISOString().slice(0, 10)
        const hash = Array.from(today).reduce(
          (acc, char) => acc + char.charCodeAt(0),
          0
        )
        const index = hash % data.length
        setTargetCharacter(data[index])
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei personaggi:", error)
      )
  }, [])

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    if (value.length > 0) {
      const filteredSuggestions = characters.filter((character) =>
        normalize(character.name).startsWith(normalize(value))
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSelectSuggestion = (name) => {
    setInputValue(name)
    setSuggestions([])
  }

  const handleVerify = () => {
    const foundCharacter = characters.find(
      (char) => normalize(char.name) === normalize(inputValue)
    )
    if (foundCharacter) {
      setGuesses([...guesses, foundCharacter])
      setInputValue("")
      setSuggestions([])
      if (normalize(foundCharacter.name) === normalize(targetCharacter.name)) {
        setVictory(true)
      }
    } else {
      alert("Personaggio non trovato!")
    }
  }

  const getColor = (value, target) =>
    value === target ? "bg-success" : "bg-danger"

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
        <div className="position-relative w-50 mx-auto">
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Inserisci il nome del personaggio"
            value={inputValue}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100"
              style={{ zIndex: 10 }}
            >
              {suggestions.map((char) => (
                <li
                  key={char.name}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectSuggestion(char.name)}
                  style={{ cursor: "pointer" }}
                >
                  {char.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleVerify}>
          Verifica
        </button>
        {victory && (
          <div className="alert alert-success mt-4 w-50 mx-auto" role="alert">
            Complimenti! Hai indovinato il personaggio!
          </div>
        )}
        <div className="mt-4 d-flex flex-column align-items-center gap-2">
          {guesses
            .slice()
            .reverse()
            .map((char, index) => (
              <div key={index} className="mb-2">
                <h4 className="text-white">{char.name}</h4>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <span
                    className={`p-2 text-white ${getColor(
                      char.crew,
                      targetCharacter.crew
                    )}`}
                  >
                    {char.crew}
                  </span>
                  <span
                    className={`p-2 text-white ${getColor(
                      char.haki,
                      targetCharacter.haki
                    )}`}
                  >
                    {char.haki ? "Haki: Sì" : "Haki: No"}
                  </span>
                  <span
                    className={`p-2 text-white ${getColor(
                      char.bounty,
                      targetCharacter.bounty
                    )}`}
                  >
                    Taglia: {char.bounty}
                  </span>
                  <span
                    className={`p-2 text-white ${getColor(
                      char.height,
                      targetCharacter.height
                    )}`}
                  >
                    Altezza: {char.height}
                  </span>
                  <span
                    className={`p-2 text-white ${getColor(
                      char.devilFruit,
                      targetCharacter.devilFruit
                    )}`}
                  >
                    Frutto del diavolo: {char.devilFruit ? "Sì" : "No"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ClassicMode
