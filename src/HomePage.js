import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const HomePage = () => {
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
          <a className="navbar-brand text-center fs-3" href="#">
            OnePiecedle Mockup
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 className="text-white text-center">
          Indovina i personaggi di One Piece
        </h1>
        <div className="row justify-content-center mt-4">
          <GameMode
            title="Classico"
            description="Ottieni un indizio ad ogni tentativo"
            link="/classic"
          />
          <GameMode
            title="Frutto del diavolo"
            description="Indovina il nome"
            link="/devil-fruit"
          />
          <GameMode
            title="Wanted"
            description="Indovina con un poster"
            link="/wanted"
          />
        </div>
      </div>
    </div>
  )
}

const GameMode = ({ title, description, link }) => {
  return (
    <div className="col-md-3 m-3">
      <div className="card text-center p-3">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="btn btn-primary">
          Gioca
        </Link>
      </div>
    </div>
  )
}

export default HomePage
