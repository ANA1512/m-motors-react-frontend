import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token")

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
            <li>
                <Link className="dropdown-item" to="/">
                 Ventes
                </Link>
            </li>
            <li>
                <Link className="dropdown-item" to="/">
                Location
                </Link>
            </li>
        </ul>
        </li>
        <li className="nav-item">
        {localStorage.getItem("token") ? (
        <>
                <Link className="nav-link" to="/moncompte">
                Mon compte
                </Link>

                <button
                className="btn btn-outline-danger"
                onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    window.location.href = "/"
                }}
                >
                Déconnexion
                </button>
            </>
            ) : (
            <Link className="nav-link" to="/login">
                Connexion
            </Link>
            )}
                   
        </li>
        </ul>
        
        </div>

 
    </div>
    </nav>
    </div>
  )
}

export default Navbar
