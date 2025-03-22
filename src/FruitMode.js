import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const FruitMode = () => {
  const [characters, setCharacters] = useState([])
  const [devilFruitUsers, setDevilFruitUsers] = useState([])
  const [targetCharacter, setTargetCharacter] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [victory, setVictory] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    fetch("/characters.json")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data)
        const users = data.filter((char) => char.devilFruit && char.fruitName)
        setDevilFruitUsers(users)
        const today = new Date().toISOString().slice(0, 10)
        const hash = Array.from(today).reduce(
          (acc, char) => acc + char.charCodeAt(0),
          0
        )
        const index = hash % users.length
        setTargetCharacter(users[index])
      })
      .catch((err) => console.error("Errore nel caricamento:", err))
  }, [])

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    const filtered = characters.filter((char) =>
      normalize(char.name).startsWith(normalize(value))
    )
    setSuggestions(filtered)
  }

  const handleSelectSuggestion = (name) => {
    setInputValue(name)
    setSuggestions([])
  }

  const handleSubmit = () => {
    const found = characters.find(
      (char) => normalize(char.name) === normalize(inputValue)
    )
    if (found) {
      setGuesses([...guesses, found])
      if (
        targetCharacter &&
        normalize(found.name) === normalize(targetCharacter.name)
      ) {
        setVictory(true)
      }
      setInputValue("")
      setSuggestions([])
    } else {
      alert("Personaggio non trovato!")
    }
  }

  const getColorClass = (name) => {
    return normalize(name) === normalize(targetCharacter?.name)
      ? "bg-success"
      : "bg-danger"
  }

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
            OnePiecedle - Frutto del Diavolo
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        <h2 className="text-white">A chi appartiene questo frutto?</h2>
        {targetCharacter && (
          <h3 className="text-warning">{targetCharacter.fruitName}</h3>
        )}
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
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Verifica
        </button>
        {victory && (
          <div className="alert alert-success mt-4 w-50 mx-auto" role="alert">
            Sei il maestro dei frutti!
          </div>
        )}
        <div className="mt-4 d-flex flex-column align-items-center gap-2">
          {guesses
            .slice()
            .reverse()
            .map((guess, idx) => (
              <div
                key={idx}
                className={`p-2 text-white ${getColorClass(guess.name)}`}
                style={{ minWidth: "150px", borderRadius: "8px" }}
              >
                {guess.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FruitMode
