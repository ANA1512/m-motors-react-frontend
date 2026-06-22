import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">M-Motors</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">Nos véhicules</Link>
              </li>

              <li className="nav-item">
                {token ? (
                  <Link className="nav-link fw-bold" style={{ color: "green" }} to="/moncompte">
                    ● Connecté
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">Connexion</Link>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;