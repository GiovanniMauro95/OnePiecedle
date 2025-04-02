import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const LoginPage = () => {
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (nickname && password) {
      const users = JSON.parse(localStorage.getItem("users")) || []
      const existingUser = users.find((user) => user.nickname === nickname)

      if (existingUser) {
        if (existingUser.password !== password) {
          alert("Password errata!")
          return
        }
        localStorage.setItem("loggedUser", JSON.stringify({ nickname }))
        navigate("/home")
      } else {
        alert("Utente non registrato. Vai su 'Registrati'.")
      }
    } else {
      alert("Inserisci nickname e password!")
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
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
          Login ☠
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
        <button type="submit" className="btn btn-warning w-100 mb-3">
          Accedi
        </button>
        <Link to="/register" className="btn btn-outline-light w-100">
          Registrati
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
