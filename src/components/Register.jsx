import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userEmail || !userPassword) return

    const response = await fetch("https://m-motors-flask-backend.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, email: userEmail, password: userPassword })
    })

    const data = await response.json()

    if (response.ok) {
      navigate('/login')
    } else {
      setErrorMessage(data.message || "Erreur lors de l'inscription")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="card-title text-center mb-4">Créer un compte</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Votre nom"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="votre@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-dark w-100 mt-2">
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
          Déjà un compte ?{' '}
          <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default Register