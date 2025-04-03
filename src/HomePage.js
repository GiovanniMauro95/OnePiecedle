import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const HomePage = () => {
  const navigate = useNavigate()

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
  const isAdmin = loggedUser?.nickname === "admin"

  useEffect(() => {
    if (!loggedUser) {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  const getRanking = (mode) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const ranking = []

    users.forEach((user) => {
      if (user.nickname === "admin") return

      const key = `tentativi-${mode}-${user.nickname}`
      const tentativi = JSON.parse(localStorage.getItem(key))
      if (tentativi && tentativi.length) {
        const hasWon = tentativi.some(
          (t) => t.name === getCharacterOfTheDayName(mode)
        )
        if (hasWon) {
          ranking.push({ nickname: user.nickname, tentativi: tentativi.length })
        }
      }
    })

    return ranking.sort((a, b) => a.tentativi - b.tentativi)
  }

  const getCharacterOfTheDayName = (mode) => {
    const data = JSON.parse(localStorage.getItem("characterData"))
    if (!data || !Array.isArray(data)) return ""

    const today = new Date().toISOString().slice(0, 10)
    const hash = Array.from(today).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    )

    if (mode === "Classic") {
      const index = hash % data.length
      return data[index].name
    } else {
      const fruitUsers = data.filter(
        (char) => char.devilFruit && char.fruitName
      )
      const index = hash % fruitUsers.length
      return fruitUsers[index].name
    }
  }

  const handleDeleteUser = (nickname) => {
    if (window.confirm(`Sei sicuro di voler eliminare ${nickname}?`)) {
      const updatedUsers = JSON.parse(localStorage.getItem("users")).filter(
        (user) => user.nickname !== nickname
      )
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      localStorage.removeItem(`tentativi-Classic-${nickname}`)
      localStorage.removeItem(`tentativi-Fruit-${nickname}`)

      window.location.reload()
    }
  }

  return (
    <div
      className="container-fluid text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/onepiece-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <nav className="navbar d-flex justify-content-between px-4 py-3">
        <div className="d-flex align-items-center">
          <img
            src="/images/strawhat.png"
            alt="Cappello di paglia"
            width="40"
            height="40"
            className="me-2"
          />
          <span
            className="navbar-brand mb-0 fs-2"
            style={{
              fontFamily: "'Pirata One', cursive",
              color: "#00BFFF",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            One Piece Quiz ☠
          </span>
        </div>
        <button
          className="btn btn-danger fw-bold shadow-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="container mt-5">
        <h1
          className="display-2 fw-bold"
          style={{
            fontFamily: "'Pirata One', cursive",
            color: "#00BFFF",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          Indovina i personaggi di One Piece
        </h1>
        <div className="row justify-content-center mt-4">
          <GameMode
            icon="🏴‍☠️"
            title="Classico"
            description="Ottieni un indizio ad ogni tentativo"
            link="/classic"
          />
          <GameMode
            icon="🍍"
            title="Frutto del diavolo"
            description="Indovina il personaggio"
            link="/frutto-del-diavolo"
          />
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 mb-5">
            <h3
              className="mb-3"
              style={{
                color: "#ffffff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                fontFamily: "'Pirata One', cursive",
              }}
            >
              🏴‍☠️ Classifica Classic Mode
            </h3>
            <ul className="list-group">
              {getRanking("Classic").map((entry, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between"
                >
                  <strong>{entry.nickname}</strong>
                  <span>{entry.tentativi} tentativi</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-8 mb-5">
            <h3
              className="mb-3"
              style={{
                color: "#17d4ff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                fontFamily: "'Pirata One', cursive",
              }}
            >
              🍍 Classifica Fruit Mode
            </h3>
            <ul className="list-group">
              {getRanking("Fruit").map((entry, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between"
                >
                  <strong>{entry.nickname}</strong>
                  <span>{entry.tentativi} tentativi</span>
                </li>
              ))}
            </ul>
          </div>

          {isAdmin && (
            <div className="col-md-8 mb-5">
              <h3
                className="mb-3"
                style={{
                  color: "#ff4d4d",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  fontFamily: "'Pirata One', cursive",
                }}
              >
                👑 Gestione Utenti (solo admin)
              </h3>
              <ul className="list-group">
                {JSON.parse(localStorage.getItem("users") || "[]")
                  .filter((user) => user.nickname !== "admin")
                  .map((user, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{user.nickname}</span>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.nickname)}
                      >
                        Elimina
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const GameMode = ({ icon, title, description, link }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card border-warning shadow-lg h-100">
        <div className="card-body d-flex flex-column justify-content-between bg-dark bg-opacity-75 text-light">
          <h4 className="card-title text-danger">
            {icon} {title}
          </h4>
          <p className="card-text">{description}</p>
          <Link to={link} className="btn btn-outline-warning mt-3">
            Gioca
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
