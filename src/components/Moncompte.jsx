import {useState, useEffect} from 'react'

function Moncompte() {
    const [getAllClientFiles, setgetAllClientFiles] = useState([])
    const [file, setFile] = useState(null)
    const [docType, setDocType] = useState('')



      useEffect(() => {
        fetch('http://127.0.0.1:5001/dossier', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
      if (!response.ok) {
        throw new Error("Non autorisé")
      }
        return response.json()
      })
      .then(data => setgetAllClientFiles(data))
      .catch(error => {
        console.log(error)
        setgetAllClientFiles([])
      })
    }, [])
      


    const handleUpload = (dossierId) => {
      const formData = new FormData()
        formData.append('file', file)
        formData.append('doc_type', docType)
        formData.append('dossier_id', dossierId)
        

    fetch('http://127.0.0.1:5001/document', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
    
  return (
    <div>
      {
        Array.isArray(getAllClientFiles) && getAllClientFiles.map(files =>(

            <li key = {files.id}>
                 <p>id : {files.id}</p>
                <strong>type :</strong> {files.type_financement} |
                <strong>revenu :</strong> {files.revenu_mensuel} |
                <strong>Statut :</strong> {files.statut}

                <div>
                  <input type="file" onChange={e => setFile(e.target.files[0])} />
                  <select onChange={e => setDocType(e.target.value)}>
                      <option value="">-- Choisir --</option>
                      <option value="RIB">RIB</option>
                      <option value="CNI">CNI</option>
                      <option value="Fiche de paie">Fiche de paie</option>
                      <option value="Justificatif de domicile">Justificatif de domicile</option>
                  </select>
                  <button onClick={handleUpload(files.id)}>Envoyer</button>
                </div>

            </li>
          
        ))

       
      }
    
    </div>
  )
}


export default Moncompte
