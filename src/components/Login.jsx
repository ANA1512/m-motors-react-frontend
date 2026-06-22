import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userEmail || !userPassword) return

    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password: userPassword })
    })

    const data = await response.json()

    if (!response.ok) {
      setErrorMessage(data.message || "Email ou mot de passe incorrect")
      return
    }

    if (response.ok) {
      localStorage.setItem("token", data.token)

      const waitForVehicule = localStorage.getItem("waitForVehicule")

      if (waitForVehicule) {
        const vehicule = JSON.parse(waitForVehicule)

        await fetch("http://localhost:5001/dossier", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token
          },
          body: JSON.stringify({
            vehicule_id: vehicule.id,
            type_financement: vehicule.type,
            revenu_mensuel: 0,
            statut: "à compléter"
          })
        })

        localStorage.removeItem("waitForVehicule")
        alert("Vous êtes connecté !")
        window.location.href = "/moncompte"
        return
      }

      const meResponse = await fetch("http://localhost:5001/me", {
        headers: { "Authorization": `Bearer ${data.token}` }
      })
      const meData = await meResponse.json()
      localStorage.setItem('role', meData.role)

      alert("Vous êtes connecté !")

      if (meData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/moncompte')
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="card-title text-center mb-4">Connexion</h3>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="votre@email.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mt-2">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3">
          Pas encore de compte ? <Link to="/register">Créer votre compte</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
