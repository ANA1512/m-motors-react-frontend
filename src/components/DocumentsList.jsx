
import { useEffect, useState } from "react";

function DocumentsList({ dossierId }) {
  const [documents, setDocuments] = useState([]);
  console.log("DocumentsList appelé pour dossier :", dossierId);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5001/dossiers/${dossierId}/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error(err));
  }, [dossierId]);

  if (documents.length === 0) {
    return <span>Aucun document</span>;
  }

  return (
     <div className="d-flex flex-column gap-1">
    {documents.map((doc) => (
      <a
        key={doc.id}
        href={`http://localhost:5001/${doc.filepath}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-sm btn-outline-primary"
      >
        {doc.doc_type}
      </a>
    ))}
  </div>
  );
}

export default DocumentsList;
