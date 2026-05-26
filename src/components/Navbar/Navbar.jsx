import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">M-Motors</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Nos véhicules
            </a>
        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Ventes</a></li>
            <li><a className="dropdown-item" href="#">Location</a></li>
        </ul>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Mon compte</a>
        </li>
        </ul>
        
        </div>
    </div>
    </nav>
    </div>
  )
}

export default Navbar
