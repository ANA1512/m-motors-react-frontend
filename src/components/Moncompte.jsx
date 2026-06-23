import { useState, useEffect } from "react"

function Moncompte() {
  const [getAllClientFiles, setgetAllClientFiles] = useState([])
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)
  const [docType, setDocType] = useState("")
  const [revenuMensuel, setRevenuMensuel] = useState({})

  const fetchDossiers = () => {
    fetch("http://localhost:5001/dossier", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(response => {
        if (!response.ok) throw new Error("Non autorisé")
        return response.json()
      })
      .then(data => setgetAllClientFiles(data))
      .catch(error => {
        console.log(error)
        setgetAllClientFiles([])
      })
  }

  useEffect(() => {
    fetchDossiers()
    fetch("http://localhost:5001/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err))
  }, [])

  const submitDossier = (dossierId) => {
    if (file && docType) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("dossier_id", dossierId)
      formData.append("doc_type", docType)
      fetch("http://localhost:5001/document", {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        body: formData
      }).then(res => res.json())
    }

    fetch(`http://localhost:5001/dossier/${dossierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        revenu_mensuel: parseInt(revenuMensuel[String(dossierId)]),
        statut: "en attente"
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Dossier soumis et en attente d'examen")
        fetchDossiers()
      })
  }

  const uploadDocument = (dossierId) => {
    if (!file || !docType) {
      alert("Veuillez choisir un fichier et un type de document")
      return
    }
    const formData = new FormData()
    formData.append("file", file)
    formData.append("dossier_id", dossierId)
    formData.append("doc_type", docType)

    fetch("http://localhost:5001/document", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: formData
    })
      .then(res => res.json())
      .then(() => {
        alert("Document ajouté !")
        fetchDossiers()
      })
  }

  const deleteDossier = (dossierId) => {
    if (!window.confirm("Supprimer ce dossier définitivement ?")) return
    fetch(`http://localhost:5001/dossier/${dossierId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(() => {
        alert("Dossier supprimé")
        fetchDossiers()
      })
      .catch(err => console.log(err))
  }

  const deleteDocument = (docId) => {
    if (!window.confirm("Supprimer ce document ?")) return
    fetch(`http://localhost:5001/document/${docId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(() => fetchDossiers())
  }

  const badgeStatut = (statut) => {
    if (statut === "validé") return <span className="badge bg-success">validé</span>
    if (statut === "refusé") return <span className="badge bg-danger">refusé</span>
    if (statut === "en attente") return <span className="badge bg-warning text-dark">en attente</span>
    if (statut === "documents manquants") return <span className="badge bg-secondary">documents manquants</span>
    return <span className="badge bg-secondary">{statut}</span>
  }

  return (
    <div className="container mt-4">

      {user && (
        <div className="card mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 className="card-title mb-1">👤 {user.prenom} {user.nom}</h4>
              <p className="card-text mb-0"><strong>Email :</strong> {user.email}</p>
              {user.date_naissance && (
                <p className="card-text mb-0"><strong>Date de naissance :</strong> {user.date_naissance}</p>
              )}
            </div>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                localStorage.removeItem("data")
                window.location.href = "/"
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}

      <h2>Mes dossiers</h2>
      <table className="table table-bordered table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type financement</th>
            <th>Revenu mensuel</th>
            <th>Documents</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(getAllClientFiles) && getAllClientFiles.map(files => (
            <tr key={files.id}>
              <td>{files.id}</td>
              <td>{files.type_financement}</td>
              <td>{files.revenu_mensuel || "-"}</td>
              <td>
                {files.documents && files.documents.length > 0
                  ? files.documents.map(doc => (
                    <div key={doc.id} className="d-flex align-items-center gap-1 mb-1">
                      <span className="badge bg-light text-dark">{doc.doc_type}</span>
                      <button
                        className="btn btn-danger btn-sm py-0 px-1"
                        style={{ fontSize: '0.7rem' }}
                        onClick={() => deleteDocument(doc.id)}
                      >
                        🗑
                      </button>
                    </div>
                  ))
                  : <span className="text-muted">Aucun document</span>
                }
              </td>
              <td>{badgeStatut(files.statut)}</td>
              <td>
                {files.statut === "à compléter" && (
                  <div className="d-flex flex-column gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Revenu mensuel"
                      value={revenuMensuel[String(files.id)] || ""}
                      onChange={(e) => setRevenuMensuel(prev => ({
                        ...prev,
                        [String(files.id)]: e.target.value
                      }))}
                    />
                    <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
                    <select className="form-select" onChange={e => setDocType(e.target.value)}>
                      <option value="">-- Choisir --</option>
                      <option value="RIB">RIB</option>
                      <option value="CNI">CNI</option>
                      <option value="Fiche de paie">Fiche de paie</option>
                      <option value="Justificatif de domicile">Justificatif de domicile</option>
                    </select>
                    <button className="btn btn-primary" onClick={() => submitDossier(files.id)}>
                      Soumettre mon dossier
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteDossier(files.id)}>
                      🗑 Supprimer le dossier
                    </button>
                  </div>
                )}

                {files.statut !== "à compléter" && (
                  <div className="d-flex flex-column gap-2">
                    <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
                    <select className="form-select" onChange={e => setDocType(e.target.value)}>
                      <option value="">-- Choisir --</option>
                      <option value="RIB">RIB</option>
                      <option value="CNI">CNI</option>
                      <option value="Fiche de paie">Fiche de paie</option>
                      <option value="Justificatif de domicile">Justificatif de domicile</option>
                    </select>
                    <button className="btn btn-outline-secondary" onClick={() => uploadDocument(files.id)}>
                      Ajouter un document
                    </button>
                    {files.statut === "validé" && (
                      <button className="btn btn-success" onClick={() => alert("Redirection vers le paiement...")}>
                        💳 Finaliser le paiement
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => deleteDossier(files.id)}>
                      🗑 Supprimer le dossier
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Moncompte