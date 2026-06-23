
import { useEffect, useState } from "react";

function DocumentsList({ dossierId }) {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5001/dossiers/${dossierId}/documents`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchDocuments()
  }, [dossierId]);

  const deleteDocument = (docId) => {
    if (!window.confirm("Supprimer ce document ?")) return
    fetch(`http://localhost:5001/document/${docId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(() => fetchDocuments())
  }

  if (documents.length === 0) {
    return <span>Aucun document</span>;
  }

  return (
    <div>
      {documents.map(doc => (
        <div key={doc.id} className="d-flex align-items-center gap-1 mb-1">
          <button className="btn btn-outline-primary btn-sm">{doc.doc_type}</button>
          <button
            className="btn btn-danger btn-sm py-0 px-1"
            style={{ fontSize: '0.7rem' }}
            onClick={() => deleteDocument(doc.id)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}

export default DocumentsList;