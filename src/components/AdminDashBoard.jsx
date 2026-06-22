import { useEffect, useState } from "react"
import DocumentsList from "./DocumentsList";

function AdminDashBoard() {
  const [dossiers, setDossiers] = useState([])
  const [admin, setAdmin] = useState(null)
  const token = localStorage.getItem('token')

  const fetchDossiers = () => {
    fetch("http://localhost:5001/admin/dossier", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDossiers(data))
  }

  useEffect(() => {
    fetchDossiers()

    fetch("http://localhost:5001/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAdmin(data))
  }, [])

  const updateStatut = (id, newStatut) => {
    fetch(`http://localhost:5001/dossier/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ statut: newStatut })
    })
      .then(res => res.json())
      .then(updated => {
        setDossiers(dossiers.map(d => d.id === id ? updated : d))
      })
  }

  const deleteDossier = (id) => {
    if (!window.confirm("Supprimer ce dossier définitivement ?")) return
    fetch(`http://localhost:5001/dossier/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => fetchDossiers())
  }

  return (
    <div className="container mt-4">

      {/* ENCART PROFIL ADMIN */}
      {admin && (
        <div className="card mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 className="card-title mb-1">👤 {admin.prenom} {admin.nom}</h4>
              <p className="card-text mb-0"><strong>Email :</strong> {admin.email}</p>
              <span className="badge bg-dark mt-1">Administrateur</span>
            </div>
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
          </div>
        </div>
      )}

      <h2>Dashboard Admin</h2>
      <table className="table table-bordered table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Véhicule ID</th>
            <th>Type financement</th>
            <th>Revenu mensuel</th>
            <th>Documents envoyés</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dossiers.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.user_id}</td>
              <td>{d.vehicule_id}</td>
              <td>{d.type_financement}</td>
              <td>{d.revenu_mensuel}</td>
              <td style={{ minWidth: "180px" }}>
                <DocumentsList dossierId={d.id} />
              </td>
              <td>
                <select
                  value={d.statut}
                  onChange={e => updateStatut(d.id, e.target.value)}
                >
                  <option value="en attente">en attente</option>
                  <option value="validé">validé</option>
                  <option value="refusé">refusé</option>
                  <option value="documents manquants">documents manquants</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteDossier(d.id)}
                >
                  🗑 Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashBoard