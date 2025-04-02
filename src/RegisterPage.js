import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (nickname && password) {
      const users = JSON.parse(localStorage.getItem("users")) || []
      const alreadyExists = users.find((user) => user.nickname === nickname)

      if (alreadyExists) {
        alert("Nickname già registrato. Scegline un altro.")
        return
      }

      users.push({ nickname, password, tentativi: null })
      localStorage.setItem("users", JSON.stringify(users))
      alert("Registrazione completata! Ora puoi fare il login.")
      navigate("/")
    } else {
      alert("Inserisci tutti i campi!")
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/register-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleRegister}
        className="p-5 rounded shadow"
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
          color: "#FFD700",
          width: "100%",
          maxWidth: "400px",
          border: "2px solid #FFD700",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "'Pirata One', cursive" }}
        >
          Registrati ☠
        </h2>
        <div className="mb-3">
          <label className="form-label">Nickname</label>
          <input
            type="text"
            className="form-control"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrati
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
